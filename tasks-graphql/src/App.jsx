import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import './App.css';

const GET_DATA = gql`
  query Query {
    tasks {
      _id
      completed
      title
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
  createTask(title: $title) {
    title
  }
  }
`;


const createTask = (title)  =>{
  const [createUser, {loading: mutationLoading, error: mutationError}] = useMutation(CREATE_TASK, {
    refetchQueries: [{query: GET_DATA}],
  });
}

function App() {
  const { loading, error, data } = useQuery(GET_DATA);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div id='create-input'>
        <input type="text" id='title-task'/>
        <button className='button-create' onClick={(title) => createTask(title)}>Crear</button>
      </div>

      <h1>Tareas:</h1>
      <ul className='task-list'>
        {data.tasks.map((task) => (
          <li key={task._id} className='task-item'>
            <h2>{task.title}</h2>
            <p>{task.completed ? 'Completada' : 'Incompleta'}</p>
            <button className='button-delete'>Eliminar</button>
            <button className='button-update'>Modificar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
