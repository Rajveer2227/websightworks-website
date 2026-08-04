import { WHATSAPP_CONFIG } from '../constants/whatsapp';
import './WhatsAppWidget.css';

/** Official SVG WhatsApp Icon */
function WhatsAppIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="whatsapp-icon-svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.2 4.488L3 21l4.644-1.218a8.95 8.95 0 0 0 4.406 1.157h.004c4.947 0 8.976-4.027 8.978-8.977 0-2.398-.934-4.653-2.629-6.329zM12.056 19.31v-.001a7.464 7.464 0 0 1-3.8-1.043l-.272-.162-2.825.74.753-2.753-.178-.283A7.447 7.447 0 0 1 4.593 11.977c0-4.114 3.348-7.462 7.465-7.462 1.993 0 3.867.777 5.275 2.187 1.408 1.41 2.184 3.285 2.183 5.279 0 4.114-3.349 7.462-7.46 7.462zm4.095-5.592c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.71.879-.13.149-.261.168-.486.056-.225-.113-.949-.35-1.808-1.115-.668-.596-1.12-1.33-1.25-1.554-.132-.224-.014-.346.099-.458.101-.1.225-.262.337-.393.112-.132.149-.224.225-.374.075-.15.037-.281-.019-.393-.056-.113-.505-1.217-.692-1.666-.182-.437-.367-.378-.504-.385l-.43-.008c-.149 0-.393.056-.599.281-.205.224-.786.767-.786 1.872 0 1.104.804 2.17 0.917 2.32.112.15 1.582 2.416 3.832 3.387.535.231.953.369 1.279.473.537.171 1.026.147 1.412.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.205-.15-.43-.262z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default function WhatsAppWidget() {
  if (!WHATSAPP_CONFIG.enabled) {
    return null;
  }

  const messageParam = WHATSAPP_CONFIG.defaultMessage
    ? `?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`
    : '';

  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}${messageParam}`;

  return (
    <aside className="whatsapp-widget-container" aria-label="WhatsApp Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-widget-btn"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={32} />
      </a>
    </aside>
  );
}
