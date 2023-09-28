import React from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import QualityForm from "../components/ui/qualityForm";
import { useQualities } from "../hooks/useQualities";

const EditQualityPage = () => {
  const history = useHistory();
  const id = useParams().id;
  const { getQuality, updateQuality } = useQualities();
  const quality = getQuality(id);
  // console.log(quality);

  const handeleSubmit = (data) => {
    updateQuality(data).then((data) => {
      if (data) history.push("/");
    });
  };

  return (
    <>
      <h1>Edit Quality Page</h1>{" "}
      <QualityForm initialState={quality} onSubmit={handeleSubmit} />
    </>
  );
};

export default EditQualityPage;
