import { useEffect, useState } from "react";


const useBiodata = () => {
  const [biodata, setBiodata] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/biodata")
    //  fetch("biodata.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBiodata(data);
      });
  }, []);

  return [biodata];
}

export default useBiodata