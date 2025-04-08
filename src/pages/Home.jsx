import { Button, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'

function Home() {
  const [book, setBook] = useState([])
  const [search, setSearch] = useState('')
  const [images, setImages] = useState([])
  const [ofilter, setOfilter] = useState('')
  const navigate = useNavigate()
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


  const GetBooks = async () => {
    const response = await axios.get(`${api_url}/api/v1/`)
    const data = response.data
    setBook(data)
    const urls = {}
      for (var b of data) {
        const image = await getImage(b.title)
        if (image.length !== 0) {
          urls[b.title] = image
        }
      }
      setImages(urls)
  }


  const getBook = async (id) => {
    const response = await axios.get(`${api_url}/api/v1/${id}`)
    const dataToSend = { author: response.data.id_author, title: response.data.title, year: response.data.publication_year, update: true, position: id }
    const responseImage = await axios.get(`${api_url}/api/v1/image/${response.data.title}`)
    const dataImage = {image: responseImage.data}
    console.log(dataToSend)
    navigate('/create', { state: {dataToSend, dataImage} })
  }



  const deleteBook = async (id, idImage) => {
    const result = await axios.delete(`${api_url}/api/v1/${id}`)
    const resultImage = await axios.delete(`${api_url}/api/v1/image/${idImage}`)
    GetBooks()
  }

  const getImage = async (id) => {
    try {
      const result = await axios.get(`${api_url}/api/v1/image/${id}`)
      const url = result.data
      if (result.length !== 0) {
        return url
      } 
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    GetBooks()
  }, [])

  useEffect(() => {
    if (ofilter === 'author') {
      const filterBooks = () => {
        const filtered = book.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))
        setBook(filtered)
      }
      filterBooks()
      if (search.length === 0) {
        GetBooks()
      }
    }

    if (ofilter === 'title') {
      const filterBooks = () => {
        const filtered = book.filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
        setBook(filtered)
      }
      filterBooks()
      if (search.length === 0) {
        GetBooks()
      }
    }

    if (ofilter === 'year') {
      const filterBooks = () => {
        const filtered = book.filter(b => b.publication_year.toString().includes(search))
        setBook(filtered)
      }
      filterBooks()
      if (search.length === 0) {
        GetBooks()
      }
    }
  }, [search, ofilter])

  return (
    <div id='home'>
      <div id='navbar'>
        <Navbar />
      </div>

      <div id='filter'>
        <h2>Filter</h2>
        <Form.Select value={ofilter} onChange={a => setOfilter(a.target.value)}>
          <option >What do you want to filter?</option>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="year">Publication year</option>
        </Form.Select>
        <InputGroup>
          <InputGroup.Text>
            <img id='icons' src="https://img.icons8.com/?size=100&id=HjFb6s4aXAL2&format=png&color=000000" alt="year" style={{ maxHeight: '25px' }} />
          </InputGroup.Text>
          <Form.Control
            placeholder='Filter'
            aria-label='Filter'
            aria-describedby='Filter'
            value={search}
            onChange={a => setSearch(a.target.value)}
          />
          <Button id='red_button' onClick={() => { setSearch('') }}>Clean</Button>
        </InputGroup>
      </div>
      <div>
        <img id='book_home' src='/img-1.jpg' alt="img-1" />
        <img id='book_home' src='/img-3.jpg' alt="img-3" />
        <img id='book_home' src='/img-2.jpg' alt="img-2" />
        <img id='book_home' src='/img-4.png' alt="img-4" />
      </div>
      <div id='cards'>
        {Array.isArray(book) &&
          book.map((bookIndex) => (
            <div id='card' key={bookIndex.id_book}>
              <img src={images[bookIndex.title]} alt='' />
              <p>{bookIndex.name}</p>
              <p id='title_home'>{bookIndex.title}</p>
              <p>{bookIndex.publication_year}</p>
              <Button
                id='yellow_button'
                value={book.id_book}
                onClick={() => { getBook(bookIndex.id_book) }}
                disabled={!Cookies.get('token')} >Edit</Button>

              <Button
                id="red_button"
                disabled={!Cookies.get('token')}
                onClick={() => { deleteBook(bookIndex.id_book, bookIndex.title) }}>Delete</Button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home
