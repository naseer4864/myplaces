import React, { useState, useContext, Fragment } from "react";
import { UserContext } from "../context/userContext";
import MyMap from "./map";
import { Link } from "react-router-dom";
import Spinner from '../asset/spinner/spinner'


const PlaceInfo = ({ places, onDelete }) => {
  const { token } = useContext(UserContext);
  const { id, image, title, description, address, location, zoom  } = places;

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleShow = () => {
    setShow(true);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true)
    setShowDelete(false);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: 'Bearer ' + token
        }
        
      }
      );
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message)
      }
      onDelete(id)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
    }
  }; 

  return (
    <Fragment>
      {isLoading && <Spinner/>}
      <div className="places-container">
      <div className="place-card">
        <div className="place-item-info">
        <img src={`http://localhost:4000/${image}`} alt={image.name} />
          <h2>{title}</h2>
          <h4>{address}</h4>
          <p>{description}</p>
        </div>
        <div className="line"></div>
        <div className="place-item-action">
          <button onClick={handleShow}>VIEW ON MAP</button>
          {token && (
            <>
              <Link to={`/places/${id}`} className="btn-edit">
                EDIT
              </Link>
              <button onClick={handleShowDelete}>DELETE</button>
            </>
          )}
        </div>
      </div>

      {showDelete && (
        <div className="delete-modal-container">
          <div className="delete-modal">
            <h2>Are you sure?</h2>
            <p>
              Do you want to proceed to delete this place? Please note that it
              can't be undone thereafter.
            </p>
            <div className="btn">
              <button onClick={handleCancelDelete}>CANCEL</button>
              <button onClick={handleConfirmDelete}>DELETE</button>
            </div>
          </div>
        </div>
      )}
      <p>{error}</p>
      {show && (
        <div className="modal-container">
          <div className="modal-card">
            <h3>{address}</h3>
            <div className="map">
              <MyMap map={{ location, zoom }} />
              <div className="btn">
                <button onClick={() => setShow(!show)}>CLOSE</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </Fragment>
  );
};

export default PlaceInfo;
