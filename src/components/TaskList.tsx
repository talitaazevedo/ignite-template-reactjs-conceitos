import { useEffect, useState } from 'react'

import {v4 as uuidv4} from 'uuid';
import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'


interface Task {
  id: string;
  title: string;
  isComplete?: boolean;
}


export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  useEffect(()=>{
    const localTasks = localStorage.getItem('@tasks:my-tasks/');
    localTasks !== null && localTasks !== " "  ? setTasks(state => [...state,JSON.parse(localTasks)]) : tasks;
    
   
  },[])
  
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    if(newTaskTitle !== null && newTaskTitle !== " ") {
      const id = uuidv4();
      const newTask = { 
        id,
        title: newTaskTitle,
        isComplete: false,

      }
      setTasks(state => [...state, newTask])
      const prevTasks = tasks;
      localStorage.setItem('@tasks:my-tasks/',JSON.stringify(prevTasks));
      
//      console.log(localStorage.getItem('@tasks:my-tasks'))
    }
    



  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let taskState = tasks ;
    
    taskState = taskState.map(t => t.id === id ? {
      ...t, isComplete: !t.isComplete} : t);
      setTasks(taskState);
    }
    
 
  
    
  

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    
    
    localStorage.removeItem(`@tasks:my-tasks/${id}`)
    setTasks(tasks.filter( t => t.id !== id))
    


    

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks && tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}

function uuid() {
  throw new Error('Function not implemented.');
}
