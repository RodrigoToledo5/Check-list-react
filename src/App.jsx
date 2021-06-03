import React, {Fragment,useState,useRef,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {TodoList} from './components/TodoList'

const KEY= 'todoApp.todos';

export function App(){
    const[todos,setTodos]= useState([{id:1, task:'tarea 1', completed:false }]);
    
    const todoTaskRef=useRef();

    const toggleTodo=(id)=>{
        const newTodos= [...todos];
        const todo=newTodos.find((todo)=>todo.id===id);
        todo.completed=!todo.completed;
        setTodos(newTodos);
    }

    useEffect(()=>{
        const storedTodos=JSON.parse(localStorage.getItem(KEY));
        if (storedTodos){
            setTodos(storedTodos);
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos));
    },[todos]);

    

    const handleTodoAdd=()=>{
        const task= todoTaskRef.current.value;
        if (task==='') return;

        setTodos((prevTodos)=>{
            return [... prevTodos,{id: uuidv4(), task, completed:false}]
        });
        todoTaskRef.current.value=null;
    };
    
    const handleClearAll=()=>{
        const newTodos= todos.filter((todo)=>!todo.completed);
        setTodos(newTodos);
    }

    return(
    <Fragment>
    <TodoList todos={todos} toggleTodo={toggleTodo}></TodoList>
    <input ref={todoTaskRef} type='text' placeholder='nueva tarea' ></input>
    <button onClick= {handleTodoAdd}>anhadir tarea</button>
    <button onClick= {handleClearAll}>Clear</button>
    <div>Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por completar</div>
    </Fragment>
    );
}
