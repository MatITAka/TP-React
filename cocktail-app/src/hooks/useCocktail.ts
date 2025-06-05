import { useEffect, useState } from 'react'

export function useCocktailList() {
    const [cocktails, setCocktails] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const cached = localStorage.getItem('cocktailList')
        if (cached) {
            setCocktails(JSON.parse(cached))
            setLoading(false)
        } else {
            const fetchAll = async () => {
                const letters = 'abcdefghijklmnopqrstuvwxyz'
                let allDrinks: any[] = []
                for (const letter of letters) {
                    const res = await fetch(`/api/api/json/v1/1/search.php?f=${letter}`)
                    const data = await res.json()
                    if (data.drinks) {
                        allDrinks = allDrinks.concat(data.drinks)
                    }
                }
                setCocktails(allDrinks)
                localStorage.setItem('cocktailList', JSON.stringify(allDrinks))
                setLoading(false)
            }
            fetchAll()
        }
    }, [])

    return { cocktails, loading }
}

export const useCocktailDetail = (id: string | undefined) => {
    const [cocktail, setCocktail] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        const fetchCocktail = async () => {
            const res = await fetch(`/api/api/json/v1/1/lookup.php?i=${id}`)
            const data = await res.json()
            setCocktail(data.drinks ? data.drinks[0] : null)
            setLoading(false)
        }
        fetchCocktail()
    }, [id])

    return { cocktail, loading }
}

export const getFavorites = (): string[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

export const addFavorite = (id: string) => {
    const favs = getFavorites()
    if (!favs.includes(id)) {
        localStorage.setItem('favorites', JSON.stringify([...favs, id]))
    }
}

export const removeFavorite = (id: string) => {
    const favs = getFavorites().filter(favId => favId !== id)
    localStorage.setItem('favorites', JSON.stringify(favs))
}

export const useIsFavorite = (id: string) => {
    const [isFav, setIsFav] = useState(false)
    useEffect(() => {
        const checkFav = () => setIsFav(getFavorites().includes(id))
        checkFav()
        window.addEventListener('storage', checkFav)
        return () => window.removeEventListener('storage', checkFav)
    }, [id])
    return isFav
}