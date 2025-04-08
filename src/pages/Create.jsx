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
  const [bookImage, setBookImage] = useState('')
  const [update, setUpdate] = useState(false)
  const [values, setValues] = useState(
    {
      id_author: "",
      title: "",
      publication_year: "",
    })
  const [imageValues, setimageValues] = useState(
    {
      url: "",
      id: "",
    })
  const api_url = import.meta.env.VITE_API_URL

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
  const { dataToSend, dataImage } = location.state || {};

  const createBooks = async () => {
    const response = await axios.post(`${api_url}/api/v1/`, values)
  }

  const createImage = async () => {
    try {
      const response = await axios.post(`${api_url}/api/v1/image`, imageValues)
    } catch (error) {
      console.log(error)
    }
  }

  const updateBook = async () => {
    try {
      const id = dataToSend?.position
    const response = await axios.put(`${api_url}/api/v1/${id}`, values)
    setUpdate(false)
    } catch (error) {
      console.log(error)
    }
    
  }

  const updateImage = async () => {
    const id = title
    const url = { url: bookImage}
    const response = await axios.put(`${api_url}/api/v1/image/${id}`, url)
  }

  const handleSubmit = () => {
    const json =
    {
      id_author: author,
      title: title,
      publication_year: year,
    }
    const jsonImage =
    {
      url: bookImage,
      id: title,
    }
    setValues(json)
    setimageValues(jsonImage)
  }

  const cleanButton = () => {
    setAuthor('')
    setTitle('')
    setYear('')
    setBookImage('')
  }

  useEffect(() => {
    console.log()
    if (dataToSend !== undefined &&dataImage !== undefined) {
      setAuthor(dataToSend?.author)
      setTitle(dataToSend?.title)
      setYear(dataToSend?.year)
      setUpdate(dataToSend?.update)
      setBookImage(dataImage?.image)
    }
    if (title.length >= 1 && update === false && (author.length === 1 || author.length === 2) && year.length === 4) {
      createBooks()
      createImage()
      navigate('/')
    } else if (title.length >= 1 && update === true) {
      updateBook()
      updateImage()
      navigate('/')
    }
  }, [values, imageValues])
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
          <Form.Select id='column' value={author} onChange={a => setAuthor(a.target.value)} required>
            <option >Select the author</option>
            <option value="1">J.R.R Tolkien</option>
            <option value="2">C.S Lewis</option>
            <option value="3">Miguel de Cervantes</option>
            <option value="4">Leo Tolstoi</option>
            <option value="5">Fyodor Dostoyevski </option>
            <option value="6">Charles Dickens</option>
            <option value="7">William Shakespeare </option>

          </Form.Select>

          <InputGroup id="column">
            <InputGroup.Text>
              <img id='icons' src="https://img.icons8.com/?size=100&id=wekXDHaVl92g&format=png&color=000000" alt="title"/>
            </InputGroup.Text>
            <Form.Control
              placeholder='Title'
              aria-label='Title'
              aria-describedby='column'
              value={title}
              onChange={a => setTitle(a.target.value)
              }
              required
            />
          </InputGroup>

          <InputGroup id="column">
            <InputGroup.Text id="column">
              <img id='icons' src="https://img.icons8.com/?size=100&id=wriPEWSue6y6&format=png&color=000000" alt="year"/>
            </InputGroup.Text>
            <Form.Control
              placeholder='Publication year'
              aria-label='Publication year'
              aria-describedby='column'
              type='number'
              value={year}
              onChange={a => {
                if (a.target.type === 'number') {
                  setYear(a.target.value)
                }
              }}
              required
            />
          </InputGroup>
          <InputGroup id="column">
            <InputGroup.Text id="column">
              <img id='icons' src="https://img.icons8.com/color/48/image.png" alt="book_image"/>
            </InputGroup.Text>
            <Form.Control
              placeholder='Book image'
              aria-label='Book image'
              aria-describedby='column'
              value={bookImage}
              onChange={a => setBookImage(a.target.value)}
              required
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
