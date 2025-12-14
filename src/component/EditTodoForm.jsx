import React, { useState } from 'react'
export const EditTodoForm = ({ editTodo, task }) => {
    const [value, setValue] = useState(task.task);
    const handleSubmit = e => {
        e.preventDefault();
        editTodo(value, task.id);
        setValue("");
    }

    return (

        <form className='flex w-11/12 max-w-lg items-center justify-center space-x-3 p-3 border border-gray-200 rounded-lg shadow-xl bg-white/95 backdrop-blur-sm mx-auto' onSubmit={handleSubmit}>
            <input
                type="text"
                className='flex-grow p-2 text-base font-medium text-gray-700 bg-gray-50 border border-indigo-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-300 ease-in-out shadow-inner'
                value={value} placeholder="Update Task..." onChange={(e) => setValue(e.target.value)}
            />
            <button
                type="submit"
                className='bg-gradient-to-r from-teal-500 to-cyan-600 text-sm hover:from-teal-600 hover:to-cyan-700 text-white font-semibold w-24 py-2.5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-100'
            >
                Update Task
            </button>
        </form>
    );
}
