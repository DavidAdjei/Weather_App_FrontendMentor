import SearchIcon from "../../assets/images/icon-search.svg"

export const Intro = () => {
  return (
    <section className="w-full flex flex-col items-center text-center mt-7 px-5 md:px-0 gap-6">

      {/* Heading */}
      <h1 className="font-display text-4xl md:text-6xl text-neutral-0 leading-tight max-w-212.5">
        How’s the sky looking today?
      </h1>

      {/* Search Area */}
      <div className="w-full max-w-212.5 mt-8 flex flex-col md:flex-row gap-4 mb-8">

        {/* Input */}
        <div className="flex items-center bg-neutral-800 rounded-xl px-4 py-3 flex-1">
          <img
            src={SearchIcon}
            alt="search"
            className="w-5 h-5 opacity-70 mr-3"
          />

          <input
            type="text"
            placeholder="Search for a place..."
            className="bg-transparent outline-none text-neutral-200 placeholder-neutral-300 w-full"
          />
        </div>

        {/* Button */}
        <button className="bg-blue-500 hover:bg-blue-700 transition text-neutral-0 px-8 py-3 rounded-xl font-medium">
          Search
        </button>

      </div>
    </section>
  )
}