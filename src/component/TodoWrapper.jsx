import React, { useState } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid'
import { GroupTodo } from './GroupTodo';
import { Search } from './Search';
import '../responsive.css';
export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])
    const addTodo = (todo, category) => {
        setTodos([...todos, {
            id: uuidv4(),
            task: todo,
            category: category,
            completed: false,
            isEditing: false
        }])
        console.log(todos);
    }
    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }
    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }
    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: false } : todo))
    }

    const [categories, setCategories] = useState(['GENERAL', 'School', 'Work']);
    const [selectedCategory, setSelectedCategory] = useState('GENERAL');
    const [searchQuery, setSearchQuery] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');

    const addCategory = () => {
        if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
            setCategories([...categories, newCategoryName.trim()]);
            setNewCategoryName('');
        }
    }

    const deleteCategory = (categoryToDelete) => {
        if (categoryToDelete === 'GENERAL') {
            alert('Cannot delete the General category!');
            return;
        }

        setTodos(todos.map(todo =>
            todo.category === categoryToDelete
                ? { ...todo, category: 'GENERAL' }
                : todo
        ));

        setCategories(categories.filter(cat => cat !== categoryToDelete));
        if (selectedCategory === categoryToDelete) {
            setSelectedCategory('GENERAL');
        }
    }

    const getCategoryColor = (category) => {
        const firstLetter = category.charAt(0).toUpperCase();
        const letterColorMap = {
            'A': 'bg-red-500 text-white',
            'B': 'bg-orange-500 text-white',
            'C': 'bg-amber-500 text-black',
            'D': 'bg-yellow-500 text-black',
            'E': 'bg-lime-500 text-black',
            'F': 'bg-green-500 text-white',
            'G': 'bg-emerald-500 text-white',
            'H': 'bg-teal-500 text-white',
            'I': 'bg-cyan-500 text-black',
            'J': 'bg-sky-500 text-white',
            'K': 'bg-blue-500 text-white',
            'L': 'bg-indigo-500 text-white',
            'M': 'bg-violet-500 text-white',
            'N': 'bg-purple-500 text-white',
            'O': 'bg-fuchsia-500 text-white',
            'P': 'bg-pink-500 text-white',
            'Q': 'bg-rose-500 text-white',
            'R': 'bg-red-600 text-white',
            'S': 'bg-orange-600 text-white',
            'T': 'bg-amber-600 text-white',
            'U': 'bg-yellow-600 text-white',
            'V': 'bg-lime-600 text-white',
            'W': 'bg-green-600 text-white',
            'X': 'bg-teal-600 text-white',
            'Y': 'bg-cyan-600 text-white',
            'Z': 'bg-blue-600 text-white',
        };

        return letterColorMap[firstLetter] || 'bg-gray-700 text-white';
    }

    return (
        <div className="app-container">
            <div className="sidebar">
                <h2 className="text-2xl font-bold text-blue-800 mb-6">Categories</h2>

                <div className="space-y-2 flex-1 overflow-y-auto">
                    {categories.map((category) => {
                        const count = todos.filter(todo => todo.category === category).length;

                        return (
                            <div key={category} className="relative group">
                                <button
                                    onClick={() => setSelectedCategory(category)}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all
                                        ${selectedCategory === category
                                            ? getCategoryColor(category)
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{category}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs
                                            ${selectedCategory === category ? 'bg-white bg-opacity-30' : 'bg-gray-300'}`}>
                                            {count}
                                        </span>
                                    </div>
                                </button>

                                {category !== 'GENERAL' && (
                                    <button
                                        onClick={() => deleteCategory(category)}
                                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 flex items-center justify-center text-xs font-bold"
                                        title={`Delete ${category} category`}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Add New Category</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                            placeholder="Category name"
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={addCategory}
                            className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="w-full max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-6">
                        Add New Task
                    </h1>
                    <TodoForm addTodo={addTodo} categories={categories} />

                    <div className="mt-6">
                        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </div>
                    <div className="mt-4">
                        <h2 className={`text-2xl font-bold mb-4 px-4 py-2 rounded-md ${getCategoryColor(selectedCategory)}`}>
                            {selectedCategory} Tasks
                        </h2>
                        <GroupTodo
                            todos={todos
                                .filter(todo => todo.category === selectedCategory)
                                .filter(todo =>
                                    todo.task.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                            }
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                            editTask={editTask}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
