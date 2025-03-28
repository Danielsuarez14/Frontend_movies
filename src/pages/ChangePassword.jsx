import { Button, Form, InputGroup, Col } from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"

function ChangePassword() {

    const [password, setPassword] = useState('')
    const [enable, setEnable] = useState(false)
    const [values, setValues] = useState(
        {
            token: "",
            newPassword: "",
        }
    )

    const navigate = useNavigate()
    const location = useLocation()
    const dataReceived = location.state
    const api_url = import.meta.env.VITE_API_URL

    const checkButton = () => {
        setEnable(!enable)
    }

    const handleSubmit = () => {
        const params = new URLSearchParams(location.search)
        const token = params.get("token")
        const json = {
            token: token,
            newPassword: password,
        }
        setValues(json)
    }

    const changePassword = async () => {
        const response = await axios.post(`${api_url}/api/v2/user/change-password`, values)
    }


    useEffect(() => {
        if (values.newPassword.length !== 0) {
            changePassword()
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
            <div id="recovery">
                {!enable && (<Form onSubmit={() => checkButton()} >
                    <h1 id='title'>Recovery Password</h1>
                        <Form.Group as={Col}>
                            <Form.Label>New Password</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text >
                                    <img src="https://img.icons8.com/arcade/64/new-post--v1.png" alt="year" style={{ maxHeight: '25px' }} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    id="element"
                                    placeholder="new password"
                                    value={password}
                                    onChange={a => setPassword(a.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>
                        <Button id="yellow_button" type="submit">Change password</Button>

                </Form>)}
                {enable && (
                    <div id="confirm">
                        <h1>Are you sure of this password ?</h1>
                        <p>{password}</p>
                        <Button id="yellow_button" onClick={() => handleSubmit()}>Yes</Button>
                        <Button id="red_button" onClick={() => checkButton()}>No</Button>
                    </div>
                )}
            </div>
            <div id='row'>
                <img id='book' src='/img-3.jpg' alt="img-3" />
                <img id='book' src='/img-4.png' alt="img-4" />
            </div>
        </div>
    )
}
export default ChangePassword