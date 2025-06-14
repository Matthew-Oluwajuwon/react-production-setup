import { Layout } from '@/shared'
import * as Sentry from '@sentry/react'

function App() {
    const handleClick = () => {
        try {
            throw new Error('Sentry test error from UI button')
        } catch (error) {
            Sentry.captureException(error)
        }
    }

    return (
        <Layout>
            Hello world!!!
            <button onClick={handleClick}>Hello</button>
        </Layout>
    )
}
export default App
