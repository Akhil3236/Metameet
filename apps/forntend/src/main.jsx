import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LoginPage from './comp/LoginPage.jsx'
import RegisterPage from './comp/RegisterPage.jsx';
import Dashboard from './comp/ Dashboard.jsx'
import RoomGrid from './comp/RoomGrid.jsx'


const router=createBrowserRouter(

  createRoutesFromElements(

    <>
    <Route path='' element={<App/>}/>
    <Route path='login' element={<LoginPage/>}/>
    <Route path='Register' element={<RegisterPage/>}/>
    
     
    <Route path='user' element={<Dashboard/>}>

    </Route>

    <Route path='user/room-gird/:roomid' element={<RoomGrid/>}/>

    </>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
