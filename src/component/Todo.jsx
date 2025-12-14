import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white py-3 px-4 my-2 rounded-md shadow-lg">
      <div className="flex items-center gap-3">
        <span className={`px-2 py-1 rounded text-xs font-bold 
            ${(todo.category === 'School') ? 'bg-yellow-500 text-black' :
            (todo.category === 'Work') ? 'bg-purple-500 text-white' :
              'bg-gray-500 text-white'}`}
        >
          {todo.category || 'General'}
        </span>
        <p onClick={() => toggleComplete(todo.id)} className={`${todo.completed ? 'line-through text-gray-400' : ''} cursor-pointer`}>{todo.task}</p>
      </div>
      <div className="flex gap-2">
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(todo.id)} className="cursor-pointer hover:text-blue-500" />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} className="cursor-pointer hover:text-red-500" />
      </div>
    </div>
  );
}
