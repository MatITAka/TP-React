import { useEffect, useState } from 'react'

export const useCocktailList = () => {
    const [cocktails, setCocktails] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAllCocktails = async () => {
            const alphabet = 'abcdefghijklmnopqrstuvwxyz'
            let cocktailList: any[] = []

            for (const letter of alphabet) {
                const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
                const data = await res.json()
                if (data.drinks) {
                    cocktailList = cocktailList.concat(data.drinks)
                }
            }
            setCocktails(cocktailList)
            setLoading(false)
        }
        fetchAllCocktails()
    }, [])

    return { cocktails, loading }
}