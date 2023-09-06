import { Link } from "react-router-dom";

const UsersCard = ({user}) => {
    const {id, name, image, places} = user
    const placesCount = places.length;
    return ( 
        <div className="card-container">
            <Link to={`/${id}/Places`}>
        <div className="cards">
            <img src={`https://placebackend.herokuapp.com/${image}`} alt={image.name} />
            <div className="info">
            <h3>{name}</h3>
            <h4>{placesCount} {placesCount === 0 ? "Place" : "Places"}</h4>
            </div>
        </div>
            </Link> 
        </div>
     );
}
 
export default UsersCard;