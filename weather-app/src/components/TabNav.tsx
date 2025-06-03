type TabNavProps = {
    cities: { name: string }[];
    activeIndex: number;
    onSelect: (idx: number) => void;
    onAdd: () => void;
};

const TabNav = ({ cities, activeIndex, onSelect, onAdd }: TabNavProps) => (
    <div className="flex items-center border-b mb-6">
        {cities.map((city, idx) => (
            <button
                key={city.name + idx}
                className={`px-4 py-2 font-semibold border-b-2 transition ${
                    idx === activeIndex
                        ? "border-blue-600 text-blue-700"
                        : "border-transparent text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => onSelect(idx)}
            >
                {city.name}
            </button>
        ))}
        <button
            className="ml-2 px-3 py-2 text-xl text-blue-600 hover:bg-blue-100 rounded-full"
            onClick={onAdd}
            aria-label="Ajouter une ville"
        >
            +
        </button>
    </div>
);

export default TabNav;