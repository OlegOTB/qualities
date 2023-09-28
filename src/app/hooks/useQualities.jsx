import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();
export const useQualities = () => {
  return useContext(QualitiesContext);
};
export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setIsLoading(false);
      } catch (error) {
        // console.log(error);
        errorCatcher(error);
      }
    };
    getQualities();
  }, []);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };
  const updateQuality = async ({ _id: id, ...data }) => {
    try {
      const { content } = await qualityService.update(id, data);
      setQualities((prevState) =>
        prevState.map((item) => {
          if (item._id === content._id) {
            return content;
          }
          return item;
        })
      );
      return content;
    } catch (error) {
      // console.log("Ошибка обновления", error);
      errorCatcher(error);
    }
  };
  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prevState) => [...prevState, content]);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };
  const deleteQuality = async (id) => {
    // prevState.current=qualities;
    // setQualities((prevState) => {
    //   return prevState.filter((item) => item._id !== content._id);
    // });
    try {
      // await qualityService.delete(id);
      const { content } = await qualityService.delete(id);
      setQualities((prevState) => {
        return prevState.filter((item) => item._id !== content._id);
      });
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };
  function errorCatcher(error) {
    setError(error.message);
  }
  useEffect(() => {
    if (error !== null) {
      toast.error(error.message);
      setError(null);
    }
  }, [error]);
  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        getQuality,
        updateQuality,
        addQuality,
        deleteQuality,
      }}
    >
      {!isLoading ? children : "<h1>Qualiites loading....</h1>"}
    </QualitiesContext.Provider>
  );
};
