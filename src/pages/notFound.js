<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

export default function NotFound () {
  const navigate= useNavigate();
  return <div className="container not-found-wrapper">
=======
import { useLocation, useNavigate } from "react-router-dom";
import { Pathnames } from "../utils/helper";

export default function NotFound () {
  const navigate= useNavigate();
  const location = useLocation();
  const style={ display: 'none'}


  return <div className="container not-found-wrapper" style={Pathnames.includes(location.pathname) ? style : null}>
>>>>>>> d68e8cfc0bbd63f4a4d90a70a0172c11a5f69c29
    <div className="title-wrap">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <button className="backtohome" onClick={()=>{navigate("/")}}>back to homepage</button>
    </div>
    
  </div>
}
