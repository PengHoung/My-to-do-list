import React, { useState } from 'react'
export const TodoForm = ({ addTodo, categories = ['GENERAL', 'School', 'Work'] }) => {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("GENERAL");
    const handleSubmit = e => {
        e.preventDefault();
        if (value) {
            addTodo(value, category);
            setValue("");
        }
    }
    return (
        <form className='flex w-full items-center justify-center space-x-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white' onSubmit={handleSubmit}>
            <input
                type="text"
                className='flex-grow p-3 text-xl font-semibold text-blue-800 bg-blue-50 border-2 border-blue-300 rounded-lg placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                value={value}
                placeholder="What is the task today ?"
                onChange={(e) => setValue(e.target.value)}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 text-base text-gray-700 bg-gray-50 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out cursor-pointer"
            >       
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <button
                type="submit"
                className='bg-blue-600 hover:bg-blue-700 text-white text-base font-bold w-24 py-3 rounded-lg shadow-lg transition duration-150 ease-in-out transform hover:scale-105 active:scale-100'
            >
                Add Task
            </button>
        </form>
    );
}
