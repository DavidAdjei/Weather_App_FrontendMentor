import Logo from "../../assets/images/logo.svg"
import Unit from "../../assets/images/icon-units.svg"

export const Header = () => {
  return (
    <header className="w-full h-10 flex items-center justify-between py-15 px-20 bg-blue-700">
      
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Units Button */}
      <button className="flex items-center gap-2 bg-neutral-800 text-neutral-200 px-4 py-2 rounded-lg hover:bg-neutral-700 transition">
        <img src={Unit} alt="settings" />
        <span>Units</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

    </header>
  );
};