import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const GET_COUNTRY_DETAIL = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      capital
      currency
      continent {
        name
      }
      languages {
        name
      }
      phone
      native
    }
  }
`;

const CountryDetail = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_COUNTRY_DETAIL, {
    variables: { code: countryCode || "" },
    skip: !countryCode,
  });

  if (loading) return <div className="modal-overlay"><p className="text-white">Loading...</p></div>;
  if (error) return <div className="modal-overlay"><p className="text-red-500">Error: {error.message}</p></div>;
  if (!data?.country) return <div className="modal-overlay"><p className="text-red-500">Country not found.</p></div>;

  const country = data.country;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 relative" onClick={e => e.stopPropagation()}>
        <button onClick={closeModal} className="absolute top-4 right-4 text-xl">
          ✖
        </button>
        <h2 className="text-2xl font-bold text-black mb-4">{country.name} {country.emoji}</h2>
        <div className="space-y-2">
          <p className="text-lg">🏙 Capital: {country.capital}</p>
          <p className="text-lg">💰 Currency: {country.currency}</p>
          <p className="text-lg">🌍 Continent: {country.continent.name}</p>
          <p className="text-lg">📞 Phone Code: +{country.phone}</p>
          <p className="text-lg">🗣 Languages: {country.languages.map((lang: { name: string }) => lang.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;