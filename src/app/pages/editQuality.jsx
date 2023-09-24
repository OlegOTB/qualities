import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import EditForm from "../components/ui/editForm";
import axios from "axios";

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const id = useParams().id;
  const qualityEndPoint = "http://localhost:4000/api/v1/quality/" + String(id);
  const handeleSubmit = async (data) => {
    try {
      await axios
        .put(qualityEndPoint, data)
        .then((res) => console.log(res.data.content));
    } catch (error) {
      const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (!expectedErrors) {
        console.log("Unexpected error");
      } else console.log("Expected error");
    }
  };
  useEffect(async () => {
    const { data } = await axios.get(qualityEndPoint);
    setQuality(data.content);
  }, []);
  // console.log(quality);
  return (
    <>
      <h1>Edit Quality Page</h1>{" "}
      {quality ? (
        <EditForm data={quality} onSubmit={handeleSubmit} />
      ) : (
        "Загрузка данных...."
      )}
    </>
  );
};

export default EditQualityPage;
