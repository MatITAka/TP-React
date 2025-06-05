import { useCocktailList } from '../hooks/useCocktail'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import SearchAndFilter from '../components/SearchAndFilter'
import { useMemo, useState } from "react";

const Home = () => {
    const { cocktails, loading } = useCocktailList()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [tag, setTag] = useState('')

    const categories = useMemo(
        () => Array.from(new Set(cocktails.map(c => c.strCategory).filter(Boolean))),
        [cocktails]
    )
    const tagsList = useMemo(
        () => Array.from(
            new Set(
                cocktails.flatMap(c => (c.strTags ? c.strTags.split(',') : []))
                    .map(t => t.trim())
                    .filter(Boolean)
            )
        ),
        [cocktails]
    )

    const filtered = useMemo(
        () => cocktails.filter(c =>
            (!search || c.strDrink.toLowerCase().includes(search.toLowerCase())) &&
            (!category || c.strCategory === category) &&
            (!tag || (c.strTags && c.strTags.split(',').map((t: string) => t.trim()).includes(tag)))
        ),
        [cocktails, search, category, tag]
    )

    if (loading) return <Loader />

    return (
        <div>
            <h1 className="uppercase text-center mt-10 mb-10 text-2xl font-bold">Liste des cocktails</h1>
            <div className="flex justify-end mb-10 mx-16">
                <a href="/favorites" className="text-center block mb-10 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                    Mes cocktails favoris
                </a>
            </div>
            <SearchAndFilter
                search={search}
                onSearch={setSearch}
                category={category}
                onCategory={setCategory}
                tag={tag}
                onTag={setTag}
                categories={categories}
                tags={tagsList}
            />
            <ul className="flex flex-wrap gap-4 justify-center">
                {filtered.map(cocktail => (
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
        </div>
    )
}

export default Home