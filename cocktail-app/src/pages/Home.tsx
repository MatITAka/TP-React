import { useCocktailList } from '../hooks/useCocktail'

const Home = () => {
    const { cocktails, loading } = useCocktailList()

    if (loading) return <div>Chargement...</div>

    return (
        <div>
            <h1>Liste des cocktails</h1>
            <ul>
                {cocktails.map(cocktail => (
                    <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
                ))}
            </ul>
        </div>
    )
}

export default Home