import * as React from 'react'
import { useState } from 'react'
import List from '../components/List'
import Modal from '../components/Modal'

type Goal = { id: number, title: string }
type Props = {
    goals: Goal[],
    onAddGoal: (title: string) => void,
    onDeleteGoal: (id: number) => void,
    onUpdateGoal: (id: number, title: string) => void
}

function ObjectiveListPage({ goals, onAddGoal, onDeleteGoal, onUpdateGoal }: Props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState<'add' | 'edit'>('add')
    const [input, setInput] = useState("")
    const [editId, setEditId] = useState<number | null>(null)

    const openAddModal = () => {
        setModalType('add')
        setInput("")
        setModalOpen(true)
    }

    const openEditModal = (goal: Goal) => {
        setModalType('edit')
        setInput(goal.title)
        setEditId(goal.id)
        setModalOpen(true)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            if (modalType === 'add') {
                onAddGoal(input)
            } else if (modalType === 'edit' && editId !== null) {
                onUpdateGoal(editId, input)
            }
            setModalOpen(false)
        }
    }

    return (
        <div>
            <h2 className="text-center mt-10 mb-10 text-4xl font-bold">Liste des objectifs</h2>
            <div className="flex justify-end mb-6 mx-14">
                <button onClick={openAddModal} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Ajouter un objectif</button>
            </div>
            <List goals={goals} onEdit={openEditModal} onDelete={onDeleteGoal} />
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="border p-2"
                        placeholder={modalType === 'add' ? "Nouvel objectif" : "Modifier l'objectif"}
                    />
                    <button type="submit" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
                        {modalType === 'add' ? "Ajouter" : "Mettre à jour"}
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default ObjectiveListPage