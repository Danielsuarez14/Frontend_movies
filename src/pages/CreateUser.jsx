import { Button, Form, InputGroup, Col } from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Navbar from '../components/Navbar'

function CreateUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [enable, setEnable] = useState(false)
    const [values, setValues] = useState(
        {
            name: "",
            email: "",
            password: "",
        }
    )
    const api_url = import.meta.env.VITE_API_URL

    const checkButton = () => {
        setEnable(!enable)
    }
    const handleSubmit = () => {
        const json = {
            name: name,
            email: email,
            password: password,
        }
        setValues(json)
    }
    const create = async () => {
        const response = await axios.post(`${api_url}/api/v2/user/`, values)
        console.log(response.data)

    }

    const navigate = useNavigate()
    const location = useLocation()
    const dataReceived = location.state

    useEffect(() => {
        if (values.name.length !== 0 && values.password.length !== 0 && values.password.length !== 0) {
            create()
            navigate('/login')
        }
    }, [values])

    return (
        <div id="login">
            <div id="navbar">
                <Navbar />
            </div>
            <div id='row'>
                <img id='book' src='/img-1.jpg' alt="img-1" />
                <img id='book' src='/img-2.jpg' alt="img-2" />
            </div>
            {enable && (
                <div id="confirm_user">
                    <h1 id="title" >Verify your inputs</h1>
                    <p >Name: {name}</p>
                    <p id="email">Email: {email}</p>
                    <p id="password">Password: {password}</p>
                    <Button id='yellow_button' onClick={() => handleSubmit()}>Yes</Button>
                    <Button id='red_button' onClick={() => checkButton()}>No</Button>
                </div>
            )}
            {!enable && (<Form id="create_user" onSubmit={() => checkButton()} >
                <h1 id='title' >Create user</h1>
                <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="element">
                            <img id='icons' src="https://img.icons8.com/clouds/100/name.png" alt="year" />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="name"
                            aria-describedby="name"
                            value={name}
                            onChange={a => setName(a.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
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
                <Form.Group as={Col}>
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="element">
                            <img id='icons' src="https://img.icons8.com/arcade/64/lock-2.png" alt="year" />
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            id="element"
                            placeholder="password"
                            aria-describedby="password"
                            value={password}
                            onChange={a => setPassword(a.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Button id="yellow_button" type="submit">Send</Button>
            </Form>)}
            <div id='row'>
                <img id='book' src='/img-3.jpg' alt="img-3" />
                <img id='book' src='/img-4.png' alt="img-4" />
            </div>

        </div>
    )
}
export default CreateUser

