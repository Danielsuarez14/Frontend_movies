import { useState } from "react"
import axios from "axios"

const handleSubmit = async () => {
    const json =
    {
      name: name,
      title: title,
      publication_year: year,
    }
    const response = await axios.put(`http://localhost:3001/api/v2/user/`, values)
}
handleSubmit()
export const Card = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [values, setValues] = useState({

        name: "",
        email: "",
        password: "",
    })


    return (
        <div className="flex">
            <div>
                <h1>Sign Up</h1>
                <form action="">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={a => setName(a)}
                        required />
                    <input
                        type="text"
                        name='email'
                        value={email}
                        onChange={b => setEmail(b)}
                        required />
                    <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={c => setPassword(c)}
                        required
                    />
                </form>
            </div>
        </div>
    )
}