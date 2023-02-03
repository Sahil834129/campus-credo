import { useNavigate } from "react-router-dom";

export default function NotFound () {
  const navigate= useNavigate();
  return <div className="container not-found-wrapper">
    <div className="title-wrap">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <button className="backtohome" onClick={()=>{navigate("/")}}>back to homepage</button>
    </div>
    
  </div>
}
