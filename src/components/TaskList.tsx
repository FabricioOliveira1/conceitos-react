import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTasktoggle, setNewTaskToggle] = useState(false)

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const task:Task = {
      id: Math.floor(Math.random() * 65536), // Make a random id number
      title: newTaskTitle,
      isComplete: false,
    } 
    
    const isTitleExists: boolean = task.title != '';

    if (isTitleExists){ //testing if exists a text on title
      setTasks(prevTasks => [...prevTasks, task]); //adding element in array e setting it to a new state of Array
      setNewTaskTitle(''); //reset state to clean the title input
    }
  
  }

  function handleToggleTaskCompletion(id: number) {
    
    const newTask = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete //adding oposite boolean to object property "isComplete"
    } : task)

    setTasks(newTask) //setting new state to task

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id)

    setTasks(filteredTasks)// setting new state to filtered task
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
          {tasks.map(task => (
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