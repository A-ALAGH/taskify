import Card from "react-bootstrap/Card"
import UpdateTodo from "./updatetodo"
import DeleteTodo from "./deletetodo"


const TodoCard = ({ todo, settodos }) => {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{todo.duedate.substring(0, 10)}</Card.Subtitle>
        <Card.Text>
          {todo.description}
        </Card.Text>
        <Card.Text>
          Category: {todo.category}
        </Card.Text>
        <Card.Text>
          Priority: {todo.priority}
        </Card.Text>
        <div className="d-flex justify-content-center">
          <UpdateTodo id={todo._id} settodos={settodos} />
          <DeleteTodo id={todo._id} settodos={settodos} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default TodoCard;