import React from 'react'
import { Todoitems } from './Todoitems';

export function TodoList({todos,toggleTodo}) {
    return (
       <ul>
           {todos.map((todo)=>(
           <Todoitems key={todo.id} todo={todo} toggleTodo={toggleTodo}></Todoitems>
           ))}
       </ul>
    );
}
