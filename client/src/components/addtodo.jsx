import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";

function AddTodoBox({ settodos }) {
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
    settitle('')
    setdesc('')
    setmsg('')
    setdate(new Date(+new Date()+7*24*60*60*1000))
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
    axios.post('http://localhost:5000/addtodo', todo)
      .then(res => {
        settodos(oldtodos => [...oldtodos, res.data])
        handleClose()
      })
      .catch(err => {
        setmsg("Error: " + err)
      })
    }
  }
  const handleShow = () => setShow(true);

  return (
    <div className="my-4 text-center">
    <Button variant="primary" onClick={handleShow}>
    Add New Task   <i className="fa fa-plus mx-2" aria-hidden="true"></i>
  </Button> 
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
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
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddTodoBox