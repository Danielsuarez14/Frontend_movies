import { Button } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'


function Navbar() {

  const [position, setPosition] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const cleanCookies = () => {
    Cookies.remove('token', { secure: false, sameSite: 'Strict' })
    window.location.reload()
  }

  useEffect(() => {
    setPosition(location.pathname)
  }, [])



  return (
    <div id="navbar">
      <h1 id="title">C.R.U.D Books</h1>

      {position === '/' && <Button
        disabled={!Cookies.get('token')}
        onClick={() => navigate('/create')}
      >
        Create Book
      </Button>}

      {position !== '/' && position !== '/changepassword/' && (
        <Button
          onClick={() => navigate(-1)}
        >
          Back
        </Button>)}
      {position === '/changepassword/' && (
        <Button
          onClick={() => navigate('/')}
        >
          Back
        </Button>)}

      {!Cookies.get('token') && position === '/' && (
        <Button
          onClick={() => navigate('/login')}
        >
          Log in
        </Button>
      )}

      {Cookies.get('token') && (
        <Button
          onClick={() => cleanCookies()}
        >
          Log out
        </Button>
      )}
    </div>
  )
}

export default Navbar


