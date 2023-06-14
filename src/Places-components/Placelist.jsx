import React, { useState, useEffect, Fragment,  } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../asset/spinner/spinner";
import PlaceInfo from "./Placeinfo";


const PlaceList = () => {
  const { userId } = useParams();
 
 

  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPlaces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setPlaces(responseData.places);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    getPlaces();
  }, [userId]);
 

  const placeDeletedHandler = (deletedPlaceId) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== deletedPlaceId));
  };

  if (!places || places.length === 0) {
    return (
      <Fragment>
        {error && (
        <div className="modal-container">
          <div className="error-modal">
            <h3>An Error Occurred!</h3>
            <p className="error-modal">{error}</p>
            <button onClick={() => setError(false)}>Okay</button>
          </div>
        </div>
      )}
        {isLoading && <Spinner />}
        <div className="no-user-container">
          <div className="noplace-found">
            <h2>No places found. Maybe create one</h2>
            <Link to="/places/new" className="share">
              Create place
            </Link>
          </div>
        </div>
        {error && <p>{error}</p>}
      </Fragment>
    );
  }

  return (
    <Fragment>
      {isLoading && <Spinner />}
      <div>
        {places.map((place) => (
          <PlaceInfo key={place.id} places={place} onDelete={placeDeletedHandler} />
        ))}
        {error && <p>{error}</p>}
      </div>
    </Fragment>
  );
};

export default PlaceList;
