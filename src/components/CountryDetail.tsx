import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import CountryDetailModal from "./CountryDetailCard";

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
    <CountryDetailModal country={country} closeModal={closeModal} /> 
  );
};

export default CountryDetail;