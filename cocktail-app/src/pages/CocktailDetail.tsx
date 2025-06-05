import { useParams } from 'react-router-dom'
import { useCocktailDetail } from '../hooks/useCocktail'
import Detail from '../components/Detail'
import Loader from '../components/Loader'

const CocktailDetail = () => {
    const { id } = useParams()
    const { cocktail, loading } = useCocktailDetail(id)

    if (loading) return <Loader />
    return (
        <div>
        <Detail cocktail={cocktail} />
        </div>
    )
}

export default CocktailDetail