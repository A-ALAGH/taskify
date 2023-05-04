import Button from "react-bootstrap/Button"
import axios from "axios";

function DeleteTodo({ settodos, id }) {
  const handleSubmit = (e) => {
    e.preventDefault()
   
    axios.delete('http://localhost:5000/' + id)
      .then(res => {
          if(res.status !== 400){      
        settodos(oldtodos => {
            const newtodos = oldtodos.filter(todo => todo._id !== id)
            return newtodos
        })
          }else{
              alert("There is some error, Please try again")
          }
      })
      .catch(err => alert('Error ' + err))
  }

  return (
    <div className="mt-2 d-inline mx-2">
    <Button variant="danger" onClick={handleSubmit} className="smallbtns"><i className="fa-solid fa-trash"/></Button>
    </div>
  );
}

export default DeleteTodo