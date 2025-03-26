import { Button, Form, InputGroup } from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'

function Create() {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [update, setUpdate] = useState(false)
  const [values, setValues] = useState(
    {
      id_author: "",
      title: "",
      publication_year: "",
    })
    const api_url = import.meta.env.API_URL

  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )



  const navigate = useNavigate()
  const location = useLocation()
  const dataReceived = location.state

  const createBooks = async () => {
    const response = await axios.post(`${api_url}/api/v1/`, values)
  }

  const updateBook = async () => {
    const id = dataReceived.position
    const response = await axios.put(`${api_url}/api/v1/${id}`, values)
    setUpdate(false)
  }

  const handleSubmit = () => {
    const json =
    {
      id_author: author,
      title: title,
      publication_year: year,
    }
    setValues(json)
  }

  const cleanButton = () => {
    setAuthor('')
    setTitle('')
    setYear('')
  }

  useEffect(() => {
    if (dataReceived !== null) {
      setAuthor(dataReceived.author)
      setTitle(dataReceived.title)
      setYear(dataReceived.year)
      setUpdate(dataReceived.update)
    }
    if (title.length >= 1 && update === false && (author.length === 1 || author.length === 2) && year.length === 4) {
      createBooks()
      navigate('/')
    } else if (title.length >= 1 && update === true) {
      updateBook()
      navigate('/')
    }
  }, [values])
  return (
    <div id="create_book">
      <div id="navbar">
        <Navbar />
      </div>
      <div id='row'>
        <img id='book' className="book_left" src='/img-1.jpg' alt="img-1" />
        <img id='book' className="book_left" src='/img-2.jpg' alt="img-2" />
      </div>
      <div id="submit">
        <Form id="table_submit" onSubmit={handleSubmit} onReset={cleanButton}>
          <div id="title">
            {!update && (
              <h1>Create</h1>
            )}
            {update && (
              <h1>Update</h1>
            )}
          </div>
          <Form.Select id='autor' value={author} onChange={a => setAuthor(a.target.value)}>
            <option >Select the author</option>
            <option value="1">J.R.R Tolkien</option>
            <option value="2">C.S Lewis</option>
            <option value="3">Miguel de Cervantes</option>
            <option value="4">Leo Tolstoi</option>
            <option value="5">Fyodor Dostoyevski </option>
            <option value="6">Charles Dickens</option>
            <option value="7">William Shakespeare </option>

          </Form.Select>

          <InputGroup id="title">
            <InputGroup.Text>
              <img id='icons' src="https://img.icons8.com/?size=100&id=wekXDHaVl92g&format=png&color=000000" alt="title" style={{ maxHeight: '25px' }} />
            </InputGroup.Text>
            <Form.Control
              placeholder='Title'
              aria-label='Title'
              aria-describedby='title'
              value={title}
              onChange={a => setTitle(a.target.value)
              }
            />
          </InputGroup>

          <InputGroup id="year">
            <InputGroup.Text id="year">
              <img id='icons' src="https://img.icons8.com/?size=100&id=wriPEWSue6y6&format=png&color=000000" alt="year" style={{ maxHeight: '25px' }} />
            </InputGroup.Text>
            <Form.Control
              placeholder='Publication year'
              aria-label='Publication year'
              aria-describedby='year'
              type='number'
              value={year}
              onChange={a => {
                if (a.target.type === 'number') {
                  setYear(a.target.value)
                }
              }}
            />
          </InputGroup>
          <Button
            id='yellow_button'
            type='submit'
          >
            {update ? 'Update' : 'Save'}
          </Button>
          {
            !update &&
            <Button
              id='red_button'
              type='reset'
            >
              Clean
            </Button>
          }
        </Form>
      </div>
      <div id='row'>
        <img id='book' className="book_right" src='/img-3.jpg' alt="img-3" />
        <img id='book' className="book_right" src='/img-4.png' alt="img-4" />
      </div>

    </div>
  )
}

export default Create
