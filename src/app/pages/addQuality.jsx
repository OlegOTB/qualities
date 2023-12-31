import React from "react";
import { useHistory } from "react-router";
import QualityForm from "../components/ui/qualityForm";
import { useQualities } from "../hooks/useQualities";

const AddQualityPage = () => {
  const history = useHistory();
  const { addQuality } = useQualities();
  const handeleSubmit = (data) => {
    addQuality(data).then((data) => {
      if (data) history.push("/");
    });
    // console.log(data);
  };
  return (
    <>
      <h1>Add Quality</h1>
      <QualityForm onSubmit={handeleSubmit} />
    </>
  );
};

export default AddQualityPage;
