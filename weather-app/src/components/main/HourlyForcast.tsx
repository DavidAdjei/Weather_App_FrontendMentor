import React, { Component } from "react";
import type { ReactNode } from "react";
import { HourlyComp } from "../mini/HourlyComp";

// ----------------------------
// Types
// ----------------------------
type HourlyData = {
  time: string[];
  temp: number[];
  weathercode: number[];
};

type HourlyForecastProps = {
  hourlyData?: HourlyData;
};

// ----------------------------
// Error Boundary
// ----------------------------
class ForecastErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    console.error("HourlyForecast error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <aside className="bg-neutral-800 rounded-2xl p-6 w-full md:w-[320px] text-red-400">
          Something went wrong loading the forecast.
        </aside>
      );
    }

    return this.props.children;
  }
}

// ----------------------------
// HourlyForecast Component
// ----------------------------
export const HourlyForecast = ({ hourlyData }: HourlyForecastProps) => {
  // Loading / fallback UI
  if (!hourlyData || !hourlyData.time?.length) {
    return (
      <aside className="bg-neutral-800 rounded-2xl p-6 w-full md:w-[320px] text-neutral-200">
        Loading forecast...
      </aside>
    );
  }

  // Map hourly data safely
  const hourlyList = hourlyData.time.map((t, index) => ({
    time: new Date(t).toLocaleTimeString([], { hour: "numeric" }),
    temp: hourlyData.temp[index],
    code: hourlyData.weathercode[index],
  }));

  return (
    <aside className="bg-neutral-800 rounded-2xl p-6 w-full md:w-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-neutral-0 font-semibold text-lg">Hourly forecast</h2>
        <select className="bg-neutral-700 text-neutral-200 px-3 py-1 rounded-lg text-sm outline-none">
          <option>Tuesday</option>
          <option>Wednesday</option>
        </select>
      </div>

      {/* Hourly list */}
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
        {hourlyList.map((hour, index) => (
          <HourlyComp
            key={index}
            time={hour.time}
            temp={hour.temp}
            code={hour.code}
          />
        ))}
      </div>
    </aside>
  );
};

// ----------------------------
// Export with Error Boundary
// ----------------------------
export const HourlyForecastWithBoundary = (props: HourlyForecastProps) => (
  <ForecastErrorBoundary>
    <HourlyForecast {...props} />
  </ForecastErrorBoundary>
);