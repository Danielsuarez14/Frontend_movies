import { Button, Form, InputGroup, Col } from "react-bootstrap"
import axios from "axios"
import { useState} from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'

function LogIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const api_url = import.meta.env.VITE_API_URL

    const logInUser = async (json) => {
        try {
            const response = await axios.post(`${api_url}/api/v2/user/auth`, json)
            Cookies.set('token', response.data.token, {expires: 1, secure: false, sameSite: 'Strict'})
            navigate('/')
        } catch (err) {
            console.log(Object.getPrototypeOf(err).constructor.name)
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        const json = {
            email: email,
            password: password,
        }
        await logInUser(json)

    }

    return (
        <div id="login">
            <div id="navbar">
                <Navbar />
            </div>
            <div id='row'>
                <img className='book_left' id="book" src='/img-1.jpg' alt="img-1" />
                <img className='book_left' id="book" src='/img-2.jpg' alt="img-2" />
            </div>
            <Form id='table_login' onSubmit={handleSubmit} >
                <h1 id='title'>Log In</h1>
                <p>If you have a user, input your email and password.
                    But if you do not have user please create a user in the last button.</p>
                <Form.Group as={Col} id='email'>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="element">
                            <img id='icons' src="https://img.icons8.com/arcade/64/new-post--v1.png" alt="year" />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="email"
                            aria-describedby="email"
                            value={email}
                            onChange={a => setEmail(a.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} id='password'>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="element">
                            <img id='icons' src="https://img.icons8.com/arcade/64/lock-2.png" alt="year" />
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="password"
                            aria-describedby="password"
                            value={password}
                            onChange={a => setPassword(a.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Button
                    id="yellow_button"
                    type="submit">
                    Send
                </Button>
                <Button
                    id="yellow_button"
                    onClick={() => navigate('/createuser')}
                >
                    Create User
                </Button>
                <Link to={'/forpassword'}>Forgot your password? Click here</Link>
            </Form>
            <div id='row'>
                <img className='book_right' id="book" src='/img-3.jpg' alt="img-3" />
                <img className='book_right' id="book" src='/img-4.png' alt="img-4" />
            </div>
        </div >
    )
}
export default LogIn