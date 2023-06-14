import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formDefault = {
  title: "",
  description: ""
};

const UpdatePlaces = () => {
  const { placeId } = useParams();
  const [formInput, setFormInput] = useState(formDefault);
  const [places, setPlaces] = useState([]);
  const [errors, setErrors] = useState({});

  const { title, description } = formInput;

  const reSetform = () => {
    setFormInput(formDefault);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${placeId}`);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setPlaces(responseData.place);
        setFormInput(responseData.place); // Set the initial form values from the fetched place data
      } catch (error) {
        setErrors(error.message);
      }
    };
    fetchPlace();
  }, [placeId]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (title.length < 3) {
      newErrors.title = "Please enter a valid Title";
    }
    if (description.length < 5) {
      newErrors.description =
        "Please enter a valid Description (at least 6 characters)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      reSetform();

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: formInput.title,
            description: formInput.description
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        navigate('/')
      } catch (error) {
        setErrors(error.message)
      }
    }
  };

  if (!places || places.length === 0) {
    return <p>No places found</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null
    }));
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleUpdateSubmit} className="myform">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <p>{errors.title}</p>
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
          ></textarea>
          <p>{errors.description}</p>
          <button type="submit">UPDATE PLACE</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlaces;
