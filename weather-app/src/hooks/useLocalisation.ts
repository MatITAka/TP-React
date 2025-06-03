import { useState } from "react";
import type { Position } from "./useUserLocation";

const LOCAL_STORAGE_KEY = "user_positions";

type CityLocation = {
    name: string;
    position: Position;
};

export function useLocations() {

    // Initialise le state avec les positions stockées dans le localStorage
    const [locations, setLocations] = useState<CityLocation[]>(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    // Fonction pour ajouter une nouvelle localisation
    const addLocation = (loc: CityLocation) => {
        const updated = [...locations, loc];
        setLocations(updated);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    };

    return { locations, addLocation };
}