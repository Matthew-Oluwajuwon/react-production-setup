import { Layout } from '@/shared'

function App() {
    const isTrue = true
    return <Layout>Hello world!!!{isTrue || 'False'}</Layout>
}
export default App
