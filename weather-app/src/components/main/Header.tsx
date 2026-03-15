import Logo from "../../assets/images/logo.svg"
import type { WeatherUnits } from "../../types/types";
import UnitsDropdown from "../mini/UnitDropdown";

type HeaderProp = {
  units: WeatherUnits
  setUnits: (units: WeatherUnits) => void
}

export const Header = ({units, setUnits}: HeaderProp) => {
  return (
    <header className="w-full h-10 flex items-center justify-between pt-9 px-5 md:py-15 md:px-20 bg-blue-700">

      {/* Logo */}
      <div className="flex items-center">
        <img
          src={Logo}
          alt="Logo"
          className="h-6 md:h-8"
        />
      </div>

      {/* Units Button */}
      <UnitsDropdown units={units} setUnits={setUnits}/>


    </header>
  );
};