import { useQuery, gql } from "@apollo/client";
import React from "react";
import SpotlightCard from "./SpotlightCard";
import { Link, useLocation } from 'react-router-dom';

// Definisi query GraphQL
const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
      capital
      currency
    }
  }
`;

// Tipe data untuk hasil query
interface Country {
  code: string;
  name: string;
  emoji: string;
  capital: string;
  currency: string;
}

const CountryList: React.FC = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.countries) return <p>No data available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {data.countries.map((country) => (
        <Link
          key={country.code}
          to={`/country/${country.code}`}
          state={{ backgroundLocation: location }}
          className="cursor-pointer"
        >
          <SpotlightCard className="w-full max-w-[250px] h-[300px] p-4 flex flex-col items-center justify-center bg-black rounded-xl shadow-lg">
            <span className="text-9xl">{country.emoji}</span>
            <h2 className="text-white text-xl font-semibold mb-2">{country.name}</h2>
            <p className="text-gray-400 text-sm mb-1">
              🏙 Capital: {country.capital}
            </p>
            <p className="text-gray-400 text-sm mb-1">
              💰 Currency: {country.currency}
            </p>
          </SpotlightCard>
        </Link>
      ))}
    </div>
  );
};

export default CountryList;
