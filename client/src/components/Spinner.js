import React,{useState,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Spinner = ({initialCount, path="login"}) => {
    const initNum = Number(initialCount);
    const [count, setCount] = useState(initNum);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() =>{
        const interval = setInterval(()=>{
            setCount((prevValue)=>--prevValue);
        },1000)
        count===0 && navigate(`/${path}`, {
          state: location.pathname
        });
        return () => clearInterval(interval);
    } ,[count, navigate,location, path])
  return (
    <>
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
        <h1 className="Text-center">redirecting to you in {count} seconds</h1>
      <div className="spinner-border" role="status">
      </div>
    </div>
    </>
  );
};

export default Spinner;
