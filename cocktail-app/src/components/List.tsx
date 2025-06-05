import { useCocktailList, getFavorites } from '../hooks/useCocktail'
import Card from './Card'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const List: React.FC = () => {
    const { cocktails, loading } = useCocktailList()
    const navigate = useNavigate()
    const favoriteIds = getFavorites()

    if (loading) return <Loader />

    const favoriteCocktails = cocktails.filter(c => favoriteIds.includes(c.idDrink))

    if (favoriteCocktails.length === 0) {
        return <div className="text-center mt-10">Aucun favori pour le moment.</div>
    }

    return (
        <ul className="flex flex-wrap gap-4 justify-center">
            {favoriteCocktails.map(cocktail => (
                <li key={cocktail.idDrink}>
                    <Card
                        name={cocktail.strDrink}
                        category={cocktail.strCategory}
                        tags={cocktail.strTags || 'Aucun tag'}
                        image={cocktail.strDrinkThumb}
                        id={cocktail.idDrink}
                        onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}
                    />
                </li>
            ))}
        </ul>
    )
}

export default List