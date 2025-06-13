import * as Sentry from '@sentry/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

Sentry.init({
    dsn: 'https://44e8fd3f4a34a3a31ff847f6fed1198a@o4509493869019136.ingest.us.sentry.io/4509493871050752',
    enabled: import.meta.env.VITE_ENV === 'production',
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
