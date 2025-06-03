import { useEffect, useState } from "react";
import type { Position } from "./useUserLocation";

const API_KEY = "852b34d0813dfb159c64894cdabb9fa7";

type ForecastItem = {
    dt: number;
    date: string;
    hour: string;
    temperature: number;
    description: string;
    icon: string;
};

export function useWeatherForecast(position: Position | null) {
    const [forecast, setForecast] = useState<ForecastItem[][]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!position) return;
        setLoading(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}&units=metric&lang=fr`
        )
            .then((res) => res.json())
            .then((data) => {
                // Grouper par jour
                const grouped: { [date: string]: ForecastItem[] } = {};
                data.list.forEach((item: any) => {
                    const date = item.dt_txt.split(" ")[0];
                    const hour = item.dt_txt.split(" ")[1].slice(0, 5);
                    if (!grouped[date]) grouped[date] = [];
                    grouped[date].push({
                        dt: item.dt,
                        date,
                        hour,
                        temperature: item.main.temp,
                        description: item.weather[0].description,
                        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                    });
                });
                // Prendre aujourd’hui + 4 jours suivants
                const days = Object.keys(grouped).slice(0, 5);
                setForecast(days.map((d) => grouped[d]));
                setError(null);
            })
            .catch(() => setError("Erreur lors de la récupération des prévisions"))
            .finally(() => setLoading(false));
    }, [position]);

    return { forecast, loading, error };
}

export function useWeather(position: Position | null) {
    const [weather, setWeather] = useState<{ city: string; temperature: number; description: string; icon: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!position) return;
        setLoading(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}&units=metric&lang=fr`
        )
            .then((res) => res.json())
            .then((data) => {
                setWeather({
                    city: data.name,
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    icon: `https://openweathermap.org/img/wn/${data.weather[0]}png`,
                });
                setError(null);
            })
            .catch(() => setError("Erreur lors de la récupération de la météo actuelle"))
            .finally(() => setLoading(false));
    }
    , [position]);
    return { weather, loading, error };
}