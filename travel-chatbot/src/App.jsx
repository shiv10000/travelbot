import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Content from './components/Content'
import Translate from './components/Translate'
import Cost from './components/Cost'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Home/></>
    },
    {
      path: "/content",
      element: <><Navbar/><Content/>
      
      </>
    },
    {
      path: "/translate",
      element: <><Navbar/><Translate/>
      
      </>
    },
    {
      path: "/cost",
      element: <><Navbar/><Cost/>
      
      </>
    }
  
  ])
  return (
    <>
      
      <RouterProvider router={router} />

    </>
  )
}

export default App
