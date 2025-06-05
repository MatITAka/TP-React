interface DetailProps {
    cocktail: any
}

const Detail: React.FC<DetailProps> = ({ cocktail }) => {
    if (!cocktail) return <div>Cocktail non trouvé</div>


    // Construction du tableau ingrédients/mesures
    const ingredients = []
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`]
        const measure = cocktail[`strMeasure${i}`]
        if (ingredient) {
            ingredients.push({
                ingredient,
                measure: measure ? measure.trim() : ''
            })
        }
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Détails du Cocktail {cocktail.strDrink}</h1>
            <div className="max-w-xl bg-white rounded-lg shadow-md p-6">
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-full h-64 object-cover rounded mb-4" />
                <h2 className="text-2xl font-bold mb-2">{cocktail.strDrink}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mb-4 inline-block">{cocktail.strCategory}</span>
                <p className="mt-4"><strong>Instructions :</strong> {cocktail.strInstructionsFR}</p>
                <h3 className="text-lg font-semibold mt-6 mb-2">Ingrédients :</h3>
                <ul className="list-disc list-inside">
                    {ingredients.map((item, idx) => (
                        <li key={idx}>
                            {item.measure} {item.ingredient}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Detail