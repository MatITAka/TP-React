import React from 'react'

interface Props {
    search: string
    onSearch: (v: string) => void
    category: string
    onCategory: (v: string) => void
    tag: string
    onTag: (v: string) => void
    categories: string[]
    tags: string[]
}

const SearchAndFilter: React.FC<Props> = ({search, onSearch, category, onCategory, tag, onTag, categories, tags}) => (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
        <input
            type="text"
            placeholder="Rechercher un cocktail..."
            value={search}
            onChange={e => onSearch(e.target.value)}
            className="border rounded px-3 py-2"
        />
        <select value={category} onChange={e => onCategory(e.target.value)} className="border rounded px-3 py-2">
            <option value="">Toutes catégories</option>
            {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
        </select>
        <select value={tag} onChange={e => onTag(e.target.value)} className="border rounded px-3 py-2">
            <option value="">Tous tags</option>
            {tags.map(t => (
                <option key={t} value={t}>{t}</option>
            ))}
        </select>
    </div>
)

export default SearchAndFilter