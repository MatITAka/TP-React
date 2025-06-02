import { useState, useEffect } from 'react'
import { sampleGoals } from '../data/goalsData'

const STORAGE_KEY = "goals"

export function useGoals() {
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : sampleGoals
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(goals))
    }, [goals])

    const addGoal = (title) => {
        setGoals([...goals, { id: Date.now(), title }])
        alert("Objectif ajouté !")
    }

    const updateGoal = (id, newTitle) => {
        setGoals(goals.map(goal =>
            goal.id === id ? { ...goal, title: newTitle } : goal
        ))
        alert("Objectif mis à jour !")
    }

    const deleteGoal = (id) => {
        if (window.confirm("Voulez-vous vraiment valider cet objectif ?")) {
            setGoals(goals.filter(goal => goal.id !== id))
            alert("Objectif validé !")
        }
    }

    return { goals, addGoal, updateGoal, deleteGoal }
}