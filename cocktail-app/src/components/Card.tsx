import { useIsFavorite, addFavorite, removeFavorite } from '../hooks/useCocktail'


interface CardProps {
    id: string
    name: string
    category: string
    image: string
    tags?: string
    onClick?: () => void
}

const Card: React.FC<CardProps> = ({ id, name, category, image, tags, onClick }) => {
    const isFavorite = useIsFavorite(id)

    const handleStarClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isFavorite) {
            removeFavorite(id)
        } else {
            addFavorite(id)
        }
        // Pour forcer le refresh du composant
        window.dispatchEvent(new Event('storage'))
    }

    return (
        <div className="cursor-pointer bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-64" onClick={onClick}>
            <div className="self-end mb-2" onClick={handleStarClick}>
                {isFavorite ? (
                    <span role="img" aria-label="favori" className="text-yellow-400 text-2xl">★</span>
                ) : (
                    <span role="img" aria-label="non-favori" className="text-gray-400 text-2xl">☆</span>
                )}
            </div>
            <img src={image} alt={name} className="w-full h-40 object-cover rounded-t-lg mb-4" />
            <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-lg font-bold">{name}</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">{category}</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">{tags}</span>
            </div>
        </div>
    )
}

export default Card