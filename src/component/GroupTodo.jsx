import React from 'react'
import { Todo } from './Todo'
import { EditTodoForm } from './EditTodoForm'
export const GroupTodo = ({ todos, toggleComplete, deleteTodo, editTodo, editTask }) => {
    return (
        <div className="space-y-2">
            {todos.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tasks in this category yet.</p>
            ) : (
                todos.map((todo) => (
                    todo.isEditing ? (
                        <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
                    ) : (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                        />
                    )
                ))
            )}
        </div>
    )
}
