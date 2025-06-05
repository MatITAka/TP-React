import List from '../components/List'
import Loader from '../components/Loader'

const Favorites: React.FC = () => (

    <div>
        <h1 className="text-center mt-10 mb-10 text-2xl font-bold">Mes cocktails favoris</h1>
        <div className={"flex justify-end mb-10 mx-16"}>
            <a href={"/"}
               className="text-center block mb-10 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                Retour à la liste des cocktails
            </a>
        </div>
        <List/>
    </div>
)

export default Favorites