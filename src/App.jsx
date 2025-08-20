import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Create from './pages/Create.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import LogIn from './pages/LogIn.jsx'
import CreateUser from './pages/CreateUser.jsx'
import ForPassword from './pages/sendEmail.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import './styles/stylesheet.css'
import './styles/stylePhone.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/login' element={<LogIn/>} />
          <Route path='/createuser' element={<CreateUser/>} />
          <Route path='forpassword' element={<ForPassword/>}/>
          <Route path='/changepassword' element={<ChangePassword/>}/>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
