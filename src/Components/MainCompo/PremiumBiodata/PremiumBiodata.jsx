import { useEffect, useState } from "react";
import PremiumCard from "./PremiumCard";



const PremiumBiodata = () => {

  const [premiumbiodata , setPremium] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/premium-biodata')
    .then(data => data.json())
    .then(res => {
      console.log(res);
      setPremium(res.data)
    })
  },[])

  console.log(premiumbiodata);

  return (
        
    <div>
    </div>
  )
}

export default PremiumBiodata