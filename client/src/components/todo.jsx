import AddTodoBox from "./addtodo"
import TodoCard from "./todocard"
import { useEffect, useState } from "react"
import axios from "axios"

const ToDo = () => {
    const [todos, settodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/todos/')
        .then(res => {
            settodos(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <div className="container bg-white border border-5 rounded my-4 py-2">
            <h3 className="mb-3 mt-3 text-center">TODO App</h3>
            <AddTodoBox settodos={settodos} />
            <h5 className="text-center mt-5 mb-3" style={{ fontSize: '2rem', fontFamily: 'sans-serif' }}>Tasks</h5>
            <div id="tasks" className="d-flex justify-content-center flex-wrap">
              { todos.map(todo => <TodoCard todo={todo} settodos={settodos} key={todo._id} />) }
            </div>
        </div>
    )
}

export default ToDo