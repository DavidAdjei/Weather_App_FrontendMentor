type HourlyCompProps = {
    icon: string;
    time: string;
    temp: string | number;
};

export const HourlyComp = ({ icon, time, temp }: HourlyCompProps) => {
    return (
        <div className="flex items-center justify-between bg-slate-700 text-white px-4 py-2 rounded-md w-48">
            <div className="flex items-center gap-2">
                <img src={icon} alt="weather icon" className="w-5 h-5" />
                <span className="text-sm font-medium">{time}</span>
            </div>
            <span className="text-sm font-semibold">{temp}°</span>
        </div>
    )
}