import { CssBaseline, GeistProvider } from '@geist-ui/core'
import Home from './pages/Home'

function App() {

  return (
    <GeistProvider>
        <CssBaseline />
      <Home></Home>
    </GeistProvider>
  )
}

export default App
