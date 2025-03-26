import { Button, Row, Form, InputGroup, Col } from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"

function ForPassword() {

    const [email, setEmail] = useState('')
    const [enable, setEnable] = useState(false)
    const [valueEmail, setValueEmail] = useState(
        {
            email: "",
        }
    )
    const navigate = useNavigate()
    const location = useLocation()
    const dataReceived = location.state
    const api_url = import.meta.env.API_URL


    const handleSubmitSend = () => {
        const json = {
            email: email,
        }
        setValueEmail(json)
        setEnable(!enable)
    }

    const sendEmail = async () => {
        const response = await axios.post(`${api_url}/api/v2/user/auth/recovery`, valueEmail)
    }

    useEffect(() => {
        if (valueEmail.email.length !== 0) {
            sendEmail()
        }
    }, [valueEmail])

    return (
        <div id="login">
            <div id="navbar">
                <Navbar />
            </div>
            <div id='row'>
                <img id='book' src='/img-1.jpg' alt="img-1" />
                <img id='book' src='/img-2.jpg' alt="img-2" />
            </div>
            <div id='recovery' >
                {!enable && (
                    <Form onSubmit={handleSubmitSend} >
                        <h1 id='title'>Recovery Password</h1>
                        <Form.Group as={Col} >
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="element">
                                    <img id='icons' src="https://img.icons8.com/arcade/64/new-post--v1.png" alt="year" />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="element"
                                    placeholder="email"
                                    aria-describedby="email"
                                    value={email}
                                    onChange={a => setEmail(a.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>
                        <Button id="yellow_button" type="submit">Send</Button>

                    </Form>)}
                {enable && (
                    <>
                        <p id="text_confirm">Verify your email, we are sending to you a link</p>
                        <div id="loading">
                            <div id="circle"></div>
                            <div id="circle"></div>
                            <div id="circle"></div>
                        </div>
                    </>
                )}
            </div>
            <div id='row'>
                <img id='book' src='/img-3.jpg' alt="img-3" />
                <img id='book' src='/img-4.png' alt="img-4" />
            </div>
        </div>
    )
}
export default ForPassword