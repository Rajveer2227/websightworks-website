/**
 * Singleton Hero Frame Cache
 * Manages the memory lifecycle of the 300 hero image sequence frames.
 * Prevents re-fetching, re-decoding, and duplicate allocations across route changes.
 */

export const TOTAL_HERO_FRAMES = 300;
export const INITIAL_PRELOAD_COUNT = 30; // Frames 1..30 loaded before preloader exits

// Format frame index (e.g. 1 -> "001")
export const formatFrameNumber = (num: number): string => String(num).padStart(3, '0');
export const getFrameUrl = (index: number): string => `/frames/ezgif-frame-${formatFrameNumber(index)}_result.webp`;

class HeroFrameCache {
  private frames: HTMLImageElement[] = new Array(TOTAL_HERO_FRAMES);
  private loadedIndices: Set<number> = new Set();
  private initialBatchPromise: Promise<HTMLImageElement[]> | null = null;
  private isBackgroundStreamingStarted = false;
  private onFrameLoadedCallbacks: Set<(index: number) => void> = new Set();

  /**
   * Preloads an individual frame by index (1-based: 1..300).
   */
  private loadFrame(index: number): Promise<HTMLImageElement> {
    const arrayIdx = index - 1;
    if (this.frames[arrayIdx] && this.loadedIndices.has(arrayIdx)) {
      return Promise.resolve(this.frames[arrayIdx]);
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        try {
          if ('decode' in img) {
            await img.decode();
          }
        } catch {
          // Fallback if decode() is interrupted
        }
        this.frames[arrayIdx] = img;
        this.loadedIndices.add(arrayIdx);
        this.notifyFrameLoaded(arrayIdx);
        resolve(img);
      };
      img.onerror = () => {
        // In case of error, place empty image or fallback to avoid uncaught promise
        const fallback = new Image();
        this.frames[arrayIdx] = fallback;
        resolve(fallback);
      };
      img.src = getFrameUrl(index);
    });
  }

  /**
   * Loads the critical initial batch of frames (frames 1..INITIAL_PRELOAD_COUNT).
   * Reports progress (0 to 100%) during this initial load.
   */
  public loadInitialBatch(onProgress?: (percent: number) => void): Promise<HTMLImageElement[]> {
    if (this.initialBatchPromise) {
      return this.initialBatchPromise;
    }

    // Check if initial batch is already loaded
    let allInitialLoaded = true;
    for (let i = 0; i < INITIAL_PRELOAD_COUNT; i++) {
      if (!this.loadedIndices.has(i)) {
        allInitialLoaded = false;
        break;
      }
    }
    if (allInitialLoaded) {
      if (onProgress) onProgress(100);
      return Promise.resolve(this.frames);
    }

    let loadedCount = 0;
    const initialPromises: Promise<HTMLImageElement>[] = [];

    for (let i = 1; i <= INITIAL_PRELOAD_COUNT; i++) {
      const p = this.loadFrame(i).then((img) => {
        loadedCount++;
        if (onProgress) {
          onProgress(Math.floor((loadedCount / INITIAL_PRELOAD_COUNT) * 100));
        }
        return img;
      });
      initialPromises.push(p);
    }

    this.initialBatchPromise = Promise.all(initialPromises).then(() => {
      // Start background streaming of remaining frames immediately with controlled concurrency
      this.startBackgroundStreaming();
      return this.frames;
    });

    return this.initialBatchPromise;
  }

  /**
   * Concurrently streams remaining frames (INITIAL_PRELOAD_COUNT+1 to TOTAL_HERO_FRAMES)
   * in small batches (concurrency of 4) so the network connection pool and WebKit memory
   * are never overloaded.
   */
  public startBackgroundStreaming(concurrency = 4) {
    if (this.isBackgroundStreamingStarted) return;
    this.isBackgroundStreamingStarted = true;

    const remainingIndices: number[] = [];
    for (let i = INITIAL_PRELOAD_COUNT + 1; i <= TOTAL_HERO_FRAMES; i++) {
      if (!this.loadedIndices.has(i - 1)) {
        remainingIndices.push(i);
      }
    }

    if (remainingIndices.length === 0) return;

    let queueIndex = 0;
    const worker = async () => {
      while (queueIndex < remainingIndices.length) {
        const frameNum = remainingIndices[queueIndex++];
        await this.loadFrame(frameNum);
      }
    };

    const workers = Array.from({ length: Math.min(concurrency, remainingIndices.length) }, () => worker());
    Promise.all(workers);
  }

  /**
   * Returns whether the initial batch is ready for display.
   */
  public isInitialBatchReady(): boolean {
    return this.loadedIndices.has(0);
  }

  /**
   * Returns whether all frames in the entire sequence are loaded.
   */
  public isFullyLoaded(): boolean {
    return this.loadedIndices.size >= TOTAL_HERO_FRAMES;
  }

  /**
   * Retrieves the cached array of frames.
   */
  public getFrames(): HTMLImageElement[] {
    return this.frames;
  }

  /**
   * Given an index, finds the closest loaded frame to prevent visual blanking/flicker.
   */
  public getClosestLoadedFrame(targetIndex: number): HTMLImageElement | null {
    const total = this.frames.length;
    const clamped = Math.max(0, Math.min(Math.round(targetIndex), total - 1));

    if (this.loadedIndices.has(clamped) && this.frames[clamped]) {
      return this.frames[clamped];
    }

    // Search backwards first (most likely frame user just passed)
    for (let i = clamped - 1; i >= 0; i--) {
      if (this.loadedIndices.has(i) && this.frames[i]) {
        return this.frames[i];
      }
    }

    // Search forwards
    for (let i = clamped + 1; i < total; i++) {
      if (this.loadedIndices.has(i) && this.frames[i]) {
        return this.frames[i];
      }
    }

    return this.frames[0] || null;
  }

  public subscribeFrameLoaded(cb: (index: number) => void): () => void {
    this.onFrameLoadedCallbacks.add(cb);
    return () => this.onFrameLoadedCallbacks.delete(cb);
  }

  private notifyFrameLoaded(index: number) {
    this.onFrameLoadedCallbacks.forEach((cb) => cb(index));
  }
}

export const heroFrameCache = new HeroFrameCache();
