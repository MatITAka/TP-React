import { useState } from "react";

export type Position = {
    latitude: number;
    longitude: number;
};

const LOCAL_STORAGE_KEY = "user_position";

export function useUserLocation() {
    const [position, setPosition] = useState<Position | null>(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    });
    const [error, setError] = useState<string | null>(null);

    // Vérifier si la position est déjà stockée
    const askLocation = () => {
        if (!navigator.geolocation) {
            setError("La géolocalisation n'est pas supportée.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const newPos = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                };
                setPosition(newPos);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newPos));
                setError(null);
            },
            (err) => setError(err.message)
        );
    };

    return { position, error, askLocation };
}