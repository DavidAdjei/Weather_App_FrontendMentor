import Logo from "../../assets/images/logo.svg"
import Unit from "../../assets/images/icon-units.svg"
import Drop from "../../assets/images/icon-dropdown.svg"

export const Header = () => {
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
      <button className="flex items-center gap-1 md:gap-2 bg-neutral-800 text-neutral-200 px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-neutral-700 transition text-sm md:text-base">

        <img
          src={Unit}
          alt="settings"
          className="w-3 h-3 md:w-5 md:h-5"
        />

        <span>Units</span>

        <img src={Drop} alt="dropdown" className="w-3 h-3 md:w-5 md:h-5" />

      </button>


    </header>
  );
};