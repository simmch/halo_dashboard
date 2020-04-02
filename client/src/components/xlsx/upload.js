import React, { useState } from "react";
import axios from "axios";

const Uploader = () => {
  const [uploadData, setUploadData] = useState({
    selectedFile: null
  });

  const onChangeHandler = e => {
    setUploadData({
      selectedFile: e.target.files[0]
    });
  };

  const onClickHandler = e => {
    e.preventDefault();
    console.log(uploadData.selectedFile);
    const data = new FormData();
    data.append("file", uploadData.selectedFile);

    axios
      .post("/payroll/upload", data, {})
      .then(res => {
        console.log(res);
        setUploadData({
          ...uploadData,
          selectedFile: null
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="file" name="selectedFile" onChange={onChangeHandler}></input>
      <button type="button" onClick={onClickHandler}>
        upload file
      </button>
    </div>
  );
};

export default Uploader;
