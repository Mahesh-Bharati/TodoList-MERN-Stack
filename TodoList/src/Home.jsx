import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'

function Home() {
    const [todos,setTodos]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
    },[])

    const handleEdit = (id) =>{
      axios.put('http://localhost:3001/update/'+id)
      .then(result => location.reload())
      .catch(err => console.log(err))
    }
    const handleDelete = (id) =>{
      axios.delete('http://localhost:3001/delete/'+id)
      .then(result => location.reload())
      .catch(err => console.log(err))
    }
  return (
    <>
   <h2>Todo List</h2>
   <Create></Create>
   {
    todos.length===0 ?
    <div><h1>No Record</h1></div>
    : todos.map(todo=>(
        <div>
             <div style={{ display: 'flex', alignItems: 'center' }}>
             <input type="checkbox" style={{ marginRight: '10px' }} checked={todo.done} onClick={() => handleEdit(todo._id)} />
            <p style={{ marginRight: '10px' }}>{todo.task}</p>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
        </div>  
        </div>
    ))
   }
   </>
  )
}

export default Home