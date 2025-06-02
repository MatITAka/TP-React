import * as React from 'react'

type Goal = { id: number, title: string }
type Props = {
    goals: Goal[],
    onEdit: (goal: Goal) => void,
    onDelete: (id: number) => void
}

function List({ goals, onEdit, onDelete }: Props) {
    return (
        <ul className="space-y-3 max-w-xl mx-auto">
            {goals.map(goal => (
                <li key={goal.id} className="bg-white shadow rounded p-4 text-lg flex items-center justify-between">
                    <span>{goal.title}</span>
                    <div className="flex items-center">
                        <button
                            onClick={() => onEdit(goal)}
                            className="cursor-pointer text-blue-500 hover:text-blue-700 text-xl font-bold"
                            aria-label="Modifier"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={() => onDelete(goal.id)}
                            className="cursor-pointer ml-4 text-red-500 hover:text-red-700 text-xl font-bold"
                            aria-label="Supprimer"
                        >
                            ✅
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default List