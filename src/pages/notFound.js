import { useLocation, useNavigate } from "react-router-dom";
import { Pathnames } from "../utils/helper";

export default function NotFound () {
  const navigate= useNavigate();
  const location = useLocation();
  const style={ display: 'none'}


  return <div className="container not-found-wrapper" style={Pathnames.includes(location.pathname) ? style : null}>
    <div className="title-wrap">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <button className="backtohome" onClick={()=>{navigate("/")}}>back to homepage</button>
    </div>
    
  </div>
}
