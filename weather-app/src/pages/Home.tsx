import { useState } from "react";
import { useLocations } from "../hooks/useLocalisation";
import { useWeatherForecast } from "../hooks/useWeather";
import TabNav from "../components/TabNav";
import AddCityModal from "../components/AddCityModal";
import LocationButton from "../components/LocationButton";
import { useUserLocation } from "../hooks/useUserLocation";

const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

// Formate une date au format "Jour DD"
const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    const nomJour = jours[date.getDay()];
    return `${nomJour} ${date.getDate()}`;
};

const Home = () => {
    const { locations, addLocation } = useLocations();
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [openDetailIndex, setOpenDetailIndex] = useState<number | null>(null);

    // Localisation de l'utilisateur
    const { position, error, askLocation } = useUserLocation();

    // Ajouter la localisation actuelle dans la liste des villes
    const handleAddCurrentLocation = () => {
        if (position) {
            addLocation({ name: "Ma position", position });
        } else {
            askLocation();
        }
    };

    // Ville active
    const activeLocation = locations[activeIndex];
    const { forecast, loading: forecastLoading, error: forecastError } = useWeatherForecast(activeLocation?.position ?? null);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-10 mt-10">
                Météo selon mes villes
            </h1>

            {locations.length === 0 && (
                <>
                    <LocationButton onClick={handleAddCurrentLocation} />
                    {error && <div className="text-red-500 mt-4">{error}</div>}
                </>
            )}

            {locations.length > 0 && (
                <TabNav
                    cities={locations.map(loc => ({ name: loc.name }))}
                    activeIndex={activeIndex}
                    onSelect={setActiveIndex}
                    onAdd={() => setModalOpen(true)}
                />
            )}

            <AddCityModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={(city) => {
                    addLocation(city);
                    setActiveIndex(locations.length); // aller sur le nouvel onglet
                }}
                existingNames={locations.map(loc => loc.name.toLowerCase())}
            />

            {forecastLoading && <div>Chargement des prévisions...</div>}
            {forecastError && <div className="text-red-500">{forecastError}</div>}
            {forecast && forecast.length > 0 && (
                <div className="mt-8 w-full max-w-4xl text-center">
                    <h2 className="text-xl font-bold mb-8">
                        Prévisions de la semaine pour {activeLocation?.name}
                    </h2>
                    <div className="flex flex-col gap-4 text-center items-center">
                    {forecast.map((day, i) => {
                            const minTemp = Math.min(...day.map(d => d.temperature));
                            const maxTemp = Math.max(...day.map(d => d.temperature));
                            const mainIcon = day[Math.floor(day.length / 2)].icon;
                            const mainDesc = day[Math.floor(day.length / 2)].description;

                            return (
                                <div
                                    key={i}
                                    className="flex flex-col bg-white rounded-lg shadow p-4 min-w-[320px] max-w-2xl w-full"
                                >
                                    <div className="flex items-center">
                                        <div
                                            className="font-semibold text-lg min-w-[120px]">{formatDate(day[0].date)}</div>
                                        <img src={mainIcon} alt={mainDesc} className="w-14 h-14"/>
                                        <div className="flex flex-col items-start ml-4">
                                            <span
                                                className="text-xl font-bold">{Math.round(maxTemp)}°C / {Math.round(minTemp)}°C</span>
                                            <span className="text-gray-600 text-sm">{mainDesc}</span>
                                        </div>
                                        <button
                                            className="ml-auto text-blue-600 hover:underline cursor-pointer"
                                            onClick={() => setOpenDetailIndex(openDetailIndex === i ? null : i)}
                                        >
                                            {openDetailIndex === i ? "Masquer" : "Détails"}
                                        </button>
                                    </div>
                                    {openDetailIndex === i && (
                                        <div className="mt-4 flex flex-row gap-4 overflow-x-auto">
                                            {day.map((item) => (
                                                <div key={item.dt} className="flex flex-col items-center min-w-[80px]">
                                                    <span className="text-xs text-gray-500">{item.hour}</span>
                                                    <img src={item.icon} alt={item.description} className="w-10 h-10"/>
                                                    <span className="text-md font-bold">{item.temperature}°C</span>
                                                    <span
                                                        className="text-xs text-gray-700 text-center">{item.description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;