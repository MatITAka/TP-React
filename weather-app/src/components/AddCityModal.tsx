import React, { useState } from "react";

type AddCityModalProps = {
    open: boolean;
    onClose: () => void;
    onAdd: (city: { name: string; position: { latitude: number; longitude: number } }) => void;
    existingNames?: string[]; // Liste des noms de villes existantes pour éviter les doublons
};

const AddCityModal = ({ open, onClose, onAdd, existingNames = [] }: AddCityModalProps) => {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (existingNames.includes(city.trim().toLowerCase())) {
            setError("Cette ville est déjà dans la liste.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=852b34d0813dfb159c64894cdabb9fa7`
            );
            const data = await res.json();
            if (!data.length) {
                setError("Ville non trouvée");
                setLoading(false);
                return;
            }
            const { lat, lon, name } = data[0];
            onAdd({ name, position: { latitude: lat, longitude: lon } });
            setCity("");
            onClose();
        } catch {
            setError("Erreur lors de la recherche");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">Ajouter une ville</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full border px-3 py-2 rounded mb-4"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Nom de la ville"
                        required
                        disabled={loading}
                    />
                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="cursor-pointer px-3 py-2" disabled={loading}>Annuler</button>
                        <button type="submit" className="cursor-pointer px-3 py-2 bg-blue-600 text-white rounded" disabled={loading}>
                            {loading ? "Recherche..." : "Ajouter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCityModal;