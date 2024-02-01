import axios from "axios";
import { useEffect, useState } from "react";
const useCustom = (number) => {
  const [data, setData] = useState({});
  const [age, setAge] = useState();
  const makeApiCal = async() => {
    const result = await axios.get('response.json').then(res=>res).catch((err)=>err);
    setData(result);
  }
  useEffect(() => {
    //send the Age to fetch the patient data
    // axios
    //   .get("response.json" + (age
    //       ? `/${age}`
    //       : "")
    //   )
    //   .then((res) => {
    //     //setData(res.data);
    //     setData(res);
    //   });
    makeApiCal()
  }, [age]);
  return { data: data, setAge };
};
export default useCustom;

/* This hook will fetch the patient data from the server with/without help of patient age */
