import React, { useRef, useState, useEffect } from "react";

const ImageUpload = ({ onChange }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const selectFile = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const selectedFile = (event) => {
    let pickedFile;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      onChange(pickedFile); 
    }
  };

  const selectImageHandler = () => {
    selectFile.current.click();
  };

  return (
    <div className="file-form-container">
      <input
        type="file"
        id="image"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        ref={selectFile}
        onChange={selectedFile}
        required
      />
      <div className="image-upload">
        <div className="image-preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <button onClick={selectImageHandler}>SELECT IMAGE</button>
      </div>
    </div>
  );
};

export default ImageUpload;
