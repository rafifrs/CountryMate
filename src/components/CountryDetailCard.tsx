import { motion } from "framer-motion";
import ChatAssistant from "./ChatAssistant";

interface Country {
  name: string;
  emoji: string;
  capital: string;
  currency: string;
  continent: { name: string };
  phone: string;
  native: string;
  languages: { name: string }[];
}

interface ModalProps {
  country: Country;
  closeModal: () => void;
}

const CountryDetailModal: React.FC<ModalProps> = ({ country, closeModal }) => {
  return (
    <motion.div
  className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 p-4"
  onClick={closeModal}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <motion.div
    className="max-h-[90vh] bg-black rounded-lg p-6 w-auto max-w-[90vw] relative shadow-2xl border border-gray-700 overflow-y-auto"
    onClick={(e) => e.stopPropagation()}
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0.8 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
    {/* Close Button */}
    <button
      onClick={closeModal}
      className="absolute top-4 right-4 text-xl text-white hover:text-gray-600"
    >
      ⊗
    </button>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Country Details */}
      <div className="text-white justify-center text-center">
        <div className="items-center justify-center space-x-4">
          <span className="text-9xl w-fit">{country.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold">{country.name}</h2>
            <p className="text-gray-400 text-sm">({country.native})</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-gray-300">
          <p className="text-lg">🏙 Capital: {country.capital}</p>
          <p className="text-lg">💰 Currency: {country.currency}</p>
          <p className="text-lg">🌍 Continent: {country.continent.name}</p>
          <p className="text-lg">📞 Phone Code: +{country.phone}</p>
          <p className="text-lg">
            🗣 Languages: {country.languages.map((lang) => lang.name).join(", ")}
          </p>
          <p>🛖 Native: {country.native}</p>
        </div>
      </div>

      {/* Chat Assistant Section */}
      <div className="border border-gray-700 rounded-lg bg-black p-4 shadow-lg flex flex-col min-h-[400px]">
        <h3 className="text-lg font-semibold text-white mb-2">💬 Ask AI Anything About This Country</h3>
        <div className="flex-grow">
            <ChatAssistant countryName={country.name} countryInfo={{
                              capital: "",
                              currency: "",
                              continent: {
                                  name: ""
                              },
                              phone: "",
                              native: "",
                              languages: []
                          }} />
        </div>
      </div>
    </div>
  </motion.div>
</motion.div>
  );
};

export default CountryDetailModal;
