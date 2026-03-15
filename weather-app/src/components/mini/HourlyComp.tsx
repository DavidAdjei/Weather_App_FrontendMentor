/* eslint-disable react-refresh/only-export-components */
import Cloud from "../../assets/images/icon-overcast.webp"
import Sun from "../../assets/images/icon-sunny.webp"
import Rain from "../../assets/images/icon-rain.webp"
import PartCloud from "../../assets/images/icon-partly-cloudy.webp"
import Snow from "../../assets/images/icon-snow.webp"
import Fog from "../../assets/images/icon-fog.webp"
import Storm from "../../assets/images/icon-storm.webp"
import Drizzle from "../../assets/images/icon-drizzle.webp"

type HourlyCompProps = {
    time: string;
    temp: string | number;
    code: number
};

export const getWeatherIcon = (code: number) => {
    if (code === 0) return Sun
    if (code <= 2) return PartCloud
    if (code === 3) return Cloud
    if (code === 45 || code === 48) return Fog
    if (code >= 51 && code <= 67) return Rain
    if (code >= 71 && code <= 77) return Snow
    if (code >= 80 && code <= 95) return Storm
    return Drizzle
}
export const HourlyComp = ({ time, temp, code }: HourlyCompProps) => {
    return (
        <div className="w-full flex items-center justify-between bg-neutral-700 text-white px-4 py-4 rounded-md">
            <div className="flex items-center gap-3">
                <img src={getWeatherIcon(code)} alt="weather icon" className="w-6 h-6" />
                <span className="text-lg font-medium">{time}</span>
            </div>
            <span className="text-lg font-semibold">{temp}°</span>
        </div>
    )
}