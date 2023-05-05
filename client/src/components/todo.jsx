import AddTodoBox from "./addtodo"
import TodoCard from "./todocard"
import { useEffect, useState } from "react"
import axios from "axios"

const ToDo = () => {
  const [todos, settodos] = useState([])
  const [filterCategory, setFilterCategory] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  
  useEffect(() => {
    axios.get('http://localhost:3000/todos/')
      .then(res => {
        settodos(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleFilterByCategory = (category) => {
    setFilterCategory(category)
    axios.get(`http://localhost:3000/todos/category/${category}`)
      .then(res => {
        settodos(res.data)
      })
      .catch(err => console.log(err))
  }

  const handleFilterByPriority = (priority) => {
    setFilterPriority(priority)
    axios.get(`http://localhost:3000/todos/priority/${priority}`)
      .then(res => {
        settodos(res.data)
      })
      .catch(err => console.log(err))
  }

  const clearFilters = () => {
    setFilterCategory('')
    setFilterPriority('')
    axios.get(`http://localhost:3000/todos/`)
      .then(res => {
        settodos(res.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container bg-white border border-5 rounded my-4 py-2">
      <h3 className="mb-3 mt-3 text-center">TODO App</h3>
      <AddTodoBox settodos={settodos} />
      <div className="d-flex justify-content-center my-3">
        <button 
          className={`btn btn-outline-secondary mx-2 ${filterCategory === '' ? 'active' : ''}`}
          onClick={clearFilters}
        >
          All
        </button>
        <button 
          className={`btn btn-outline-secondary mx-2 ${filterCategory === 'To do' ? 'active' : ''}`}
          onClick={() => handleFilterByCategory('To do')}
        >
          To do
        </button>
        <button 
          className={`btn btn-outline-secondary mx-2 ${filterCategory === 'Doing' ? 'active' : ''}`}
          onClick={() => handleFilterByCategory('Doing')}
        >
          Doing
        </button>
        <button 
          className={`btn btn-outline-secondary mx-2 ${filterCategory === 'Done' ? 'active' : ''}`}
          onClick={() => handleFilterByCategory('Done')}
        >
          Done
        </button>
      </div>
      <div className="d-flex justify-content-center my-3">
        <button 
          className={`btn btn-outline-secondary mx-2 ${filterPriority === '' ? 'active' : ''}`}
          onClick={clearFilters}
        >
          All
        </button>
        <button 
          className={`btn btn-outline-secondary mx-2 ${filterPriority === 'Low' ? 'active' : ''}`}
          onClick={() => handleFilterByPriority('Low')}
        >
          Low
        </button>
        <button 
          className={`btn btn-outline-secondary mx-2 ${filterPriority === 'High' ? 'active' : ''}`}
          onClick={() => handleFilterByPriority('High')}
        >
          High
        </button>
      </div>
            <h5 className="text-center mt-5 mb-3" style={{ fontSize: '2rem', fontFamily: 'sans-serif' }}>Tasks</h5>
            <div id="tasks" className="d-flex justify-content-center flex-wrap">
              { todos.filter(todo => filterCategory ? todo.category === filterCategory : true)
                     .filter(todo => filterPriority ? todo.priority === filterPriority : true)
                     .map(todo => <TodoCard todo={todo} settodos={settodos} key={todo._id} />) }
            </div>
        </div>
    )
}

export default ToDo