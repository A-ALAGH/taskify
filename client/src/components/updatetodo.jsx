import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";

function UpdateTodo({ settodos, id }) {
  const [show, setShow] = useState(false);
  const [title, settitle] = useState('')
  const [desc, setdesc] = useState('')
  const [msg, setmsg] = useState('')
  const [date, setdate] = useState(new Date(+new Date()+7*24*60*60*1000))

  const ontitlechange = (e) => {
    settitle(e.target.value)
  }

  const ondescchange = (e) => {
    setdesc(e.target.value)
  }

  const ondatechange = (date) => {
    setdate(date)
  }

  const handleClose = () => {
    setShow(false);
   setmsg('')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(title.length <= 0){
      setmsg("* Title cannot be blank")
    }else{
    const todo = {
      title: title,
      description: desc,
      duedate: date
    }
    axios.put('http://localhost:3000/update/' + id, todo)
      .then(res => {
        settodos(oldtodos => {
            const newtodos = oldtodos.map(todo => {
                if(todo._id === id){
                    return res.data
                }
                return todo
            })
            return newtodos
        })
        handleClose()
      })
      .catch(err => {
        setmsg("Error: " + err)
      })
    }
  }
  const handleShow = () =>{ 
    setShow(true)
    axios.get('http://localhost:3000/todos/' + id)
    .then(res => {
        settitle(res.data.title)
        setdesc(res.data.description)
        setdate(new Date(res.data.duedate.substring(0, 10)))
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="mt-2 d-inline mx-2">
    <Button onClick={handleShow} className="smallbtns"><i className="fa-solid fa-file-pen"/></Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title here"
                value={title}
                autoFocus
                onChange={ontitlechange}
              />
            <Form.Text className="text-danger">{msg}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Due Date</Form.Label>
              <DatePicker
                onChange={ondatechange}
                selected={date}
                className="form-control"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={5} value={desc} onChange={ondescchange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateTodo