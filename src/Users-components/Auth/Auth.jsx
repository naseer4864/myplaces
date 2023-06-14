import React, { useState, useContext, Fragment } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../imageUploader/imageUpload";

import Spinner from "../../asset/spinner/spinner";

const defaultForm = {
  name: "",
  email: "",
  password: ""
};

const Auth = () => {
  const { Login } = useContext(UserContext);
  const [inputField, setInput] = useState(defaultForm);
  const [error, setError] = useState(false);
  const { name, email, password } = inputField;
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const resetForm = () => {
    setInput(defaultForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputField, [name]: value });
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(inputField);

    if (!image && !isLoginMode) {
      setError("Please select an image.");
      setIsLoading(false);
      return;
    }

    if (isLoginMode) {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: inputField.email,
            password: inputField.password,
          }),
          mode: 'cors', // Add this line to enable CORS
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        Login(responseData.userId, responseData.token);
        resetForm();
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        setError(error.message || "Something went wrong");
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', inputField.email);
        formData.append('name', inputField.name);
        formData.append('password', inputField.password);
        formData.append('image', image); // Use the 'image' state instead of 'inputField.image'
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/signup", {
          method: "POST",
          body: formData,
          mode: 'cors', // Add this line to enable CORS
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        Login(responseData.userId, responseData.token);
        resetForm();
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        setError(error.message || "Something went wrong");
      }
    }
  };

  const handleSwitch = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleImageChange = (file) => {
    setImage(file)
  };

  return (
    <Fragment>
      {isLoading && <Spinner />}
      {error && (
        <div className="modal-container">
          <div className="error-modal">
            <h3>An Error Occurred!</h3>
            <p className="error-modal">{error}</p>
            <button onClick={() => setError(false)}>Okay</button>
          </div>
        </div>
      )}
      <div className="auth-container">
        <h2>{isLoginMode ? "LOGIN" : "SIGNUP"} Required</h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode && <ImageUpload onChange={handleImageChange} />}
          {!isLoginMode && (
            <label>
              Name
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">{isLoginMode ? "LOGIN" : "SIGNUP"}</button>
        </form>
        <button onClick={handleSwitch}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </button>
      </div>
    </Fragment>
  );
};

export default Auth;
