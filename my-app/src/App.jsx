import React from 'react'
import './App.css'
import ObjectiveListPage from './pages/ObjectiveListPage'
import { useGoals } from './hooks/useGoals'

function App() {
    const { goals, addGoal, updateGoal, deleteGoal } = useGoals()

    return (
        <ObjectiveListPage
            goals={goals}
            onAddGoal={addGoal}
            onDeleteGoal={deleteGoal}
            onUpdateGoal={updateGoal}
        />
    )
}

export default App