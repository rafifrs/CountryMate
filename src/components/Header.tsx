import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";


interface HeaderProps {
  onSearch: (query: string) => void;
  onFilter: (continent: string) => void;
}

const continents = ["All Continents", "Africa", "Asia", "Europe", "North America", "Oceania", "South America"];

const Header = ({ onSearch, onFilter }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All Continents");

  return (
  
    <header className="bg-black text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg relative z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white">🌍 CountryMate</h1>

      {/* Filter Dropdown menggunakan Headless UI */}
      <Listbox value={selectedContinent} onChange={(value) => {
        setSelectedContinent(value);
        onFilter(value === "All Continents" ? "" : value);
      }}>
        <div className="relative w-60">
          <Listbox.Button className="w-full flex items-center justify-between px-4 py-3 text-white bg-black border border-gray-700 rounded-lg shadow-md hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition">
            {selectedContinent}
            <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
            {continents.map((continent) => (
              <Listbox.Option
                key={continent}
                value={continent}
                className="cursor-pointer px-4 py-2 hover:bg-gray-800 text-white"
              >
                {continent}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search country..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onSearch(e.target.value);
        }}
        className="p-3 rounded-lg bg-black text-white border border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
      />
    </header>
  );
};

export default Header;
