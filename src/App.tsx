import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded pages to support code-splitting and faster initial paint times
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Expertise = lazy(() => import('./pages/Expertise'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

// Premium, lightweight route transition spinner
const PageLoader = () => (
  <div className="page-route-loader">
    <div className="route-loader-brand">
      <img 
        src="/logo/wesightworkwhite.png" 
        alt="Websight Works Logo" 
        className="route-loader-logo"
      />
    </div>
    <style>{`
      .page-route-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #050505;
      }
      .route-loader-brand {
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulseBrand 1.5s infinite ease-in-out;
      }
      .route-loader-logo {
        height: 48px;
        width: auto;
        max-width: 220px;
        object-fit: contain;
      }
      @keyframes pulseBrand {
        0%, 100% { opacity: 0.45; transform: scale(0.98); }
        50% { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/expertise/:id" element={<Expertise />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
}
