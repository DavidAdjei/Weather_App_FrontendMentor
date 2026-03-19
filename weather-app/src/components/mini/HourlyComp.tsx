/* eslint-disable react-refresh/only-export-components */
import Sun from "../../assets/images/icon-sunny.webp"
import Rain from "../../assets/images/icon-rain.webp"
import PartCloud from "../../assets/images/icon-partly-cloudy.webp"
import Snow from "../../assets/images/icon-snow.webp"
import Fog from "../../assets/images/icon-fog.webp"
import Storm from "../../assets/images/icon-storm.webp"
import Drizzle from "../../assets/images/icon-drizzle.webp"

type TempUnit = 'celsius' | 'fahrenheit'

type HourlyCompProps = {
    time: string;
    temp: number;
    unit: TempUnit
};

export const getWeatherIcon = (temp: number, unit: TempUnit) => {
    // Convert everything to Celsius internally
    const tempC =
        unit === 'fahrenheit' ? (temp - 32) * (5 / 9) : temp

    // ❄️ Extreme cold
    if (tempC < 0) return Snow

    // ❄️ Freezing
    if (tempC <= 5) return Storm

    // 🌧 Near freezing (wet conditions)
    if (tempC <= 8) return Rain

    // 🌫 Cold & damp
    if (tempC <= 15) return Drizzle

    // ☁️ Cool
    if (tempC <= 18) return Fog

    // 🌤 Mild
    if (tempC <= 25) return PartCloud

    // ☀️ Warm
    if (tempC <= 32) return Sun

    // 🌧 Hot & unstable
    if (tempC <= 36) return Sun

    return Sun
}
export const HourlyComp = ({ time, temp, unit }: HourlyCompProps) => {
    return (
        <div className="w-full flex items-center justify-between bg-neutral-700 text-white px-4 py-4 rounded-md">
            <div className="flex items-center gap-3">
                <img src={getWeatherIcon(temp, unit)} alt="weather icon" className="w-12 h-12" />
                <span className="text-lg font-medium">{time}</span>
            </div>
            <span className="text-lg font-semibold">{temp}°</span>
        </div>
    )
}