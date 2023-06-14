
import { useState, useEffect, Fragment } from "react";
import PlaceInfo from "./Placeinfo";
import { Link, useParams } from "react-router-dom";
import Spinner from "../asset/spinner/spinner";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


const PlaceList = () => {
  const userId = useParams().userId;
  const {token} = useContext(UserContext)
 
  const [Places, setPlaces] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState(false)

  useEffect(() => {

    setIsLoading(true)
    const getPlaces = async () => {
     try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message)
      }
      setIsLoading(false)
      setPlaces(responseData.places)
     } catch (error) {
      setIsLoading(false)
      setErrors(error.message)
     }
    }
    getPlaces();
  },[userId])

  const placeDeletedHandler = (deletedPlaceId) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== deletedPlaceId));
  };
  if (!Places ||Places.length === 0) {
    return (
      <Fragment>
        {isLoading && <Spinner/>}
        <div className="no-user-container">
        <div className="noplace-found">
        <h2>No places found. Maybe create one</h2>
        {
          token ? ( <Link to="/places/new" className="share">Create place</Link>) : (<Link to="/Auth" className="share">Please Login first</Link>)
        }
      </div>
        </div>
      </Fragment>
    );
  }

  

  return (
    <Fragment>
      {isLoading && <Spinner/>}
      <div>
      {Places.map((place) => (
        <PlaceInfo key={place.id} places={place} onDelete={placeDeletedHandler}/>
      ))}
      <p>{error}</p>
    </div>
    </Fragment>
  );
};

export default PlaceList;
