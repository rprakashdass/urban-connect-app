import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Styles
import './App.css'

// Components
import Home from './components/Home.jsx';

// Routes
const router = createBrowserRouter([
  {path :'/', element: <Home/>},
])


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App