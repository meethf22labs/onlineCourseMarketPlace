import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Registration from './pages/Registration'
import Login from './pages/Login';
import MyCourses from './pages/MyCourses';
import Lectures from './pages/Lectures';
import { SnackbarProvider} from 'notistack'

function App() {

  return (
  <div className=' pt-serif-regular'>
  <SnackbarProvider>
    <Router>
      <Routes>

        <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="myCourses" element={<MyCourses />} />
            <Route path="lectures" element={<Lectures/>}/>
        </Route>

        <Route path='/registration' element={<Registration />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/myCourses' element={<MyCourses/>}/>
        
      </Routes>
    </Router>
  </SnackbarProvider>
  </div>
  )
}

export default App
