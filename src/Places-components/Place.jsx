import React, { useState, useContext, Fragment } from "react";
import { UserContext } from "../context/userContext";
import Spinner from "../asset/spinner/spinner";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../imageUploader/imageUpload";

const formDefault = {
  title: "",
  description: "",
  address: "",
};

const NewPlaces = () => {
  const { userId,token } = useContext(UserContext);
  const [formInput, setFormInput] = useState(formDefault);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  const { title, description, address } = formInput;

  const navigate = useNavigate();
  const resetForm = () => {
    setFormInput(formDefault);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (formInput.title.length < 3) {
      newErrors.title = "Please enter a valid Title";
    }
    if (formInput.description.length < 5) {
      newErrors.description =
        "Please enter a valid Description (at least 5 characters)";
    }
    if (formInput.address.length < 4) {
      newErrors.address = "Please enter a valid Address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setIsLoading(true);
      setErrors({});
      console.log(formInput);
      resetForm();
      setTimeout(() => {
        setIsLoading(false);
        setSubmitted(true);
      }, 3000);
      try {
        const formData = new FormData();
        formData.append("title", formInput.title);
        formData.append("description", formInput.description);
        formData.append("address", formInput.address);
        formData.append("creator", userId);
        formData.append("image", image);
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/places", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: 'Bearer ' + token
          },
          mode: "cors",
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        navigate("/");
      } catch (error) {
        setErrors({
          ...errors,
          general: "Something went wrong" || error.message,
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleImageChange = (file) => {
    setImage(file);
  };

  return (
    <Fragment>
      {isLoading && <Spinner />}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="myform">
          <ImageUpload onChange={handleImageChange} />
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
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
          />
          <p>{errors.address}</p>
          <button type="submit">ADD PLACE</button>
          {submitted && <h3>Place Added successfully!</h3>}
        </form>
      </div>
    </Fragment>
  );
};

export default NewPlaces;
