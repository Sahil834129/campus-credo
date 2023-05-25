import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_ROLES } from "../constants/app";
import PageContent from "../resources/pageContent";
import { convertCamelCaseToPresentableText, getLocalData, gotoHome } from "../utils/helper";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentRole = getLocalData('roles');
  const pathWithoutQuery = decodeURIComponent(location.pathname.split("?")[0]);
  const pathNestedRoutes = pathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0 && v !== "userProfile" && v !== "dashboard");
  const getLinkRef = (index) => {
    return "/" + pathNestedRoutes.slice(0, index + 1).join("/");
  };

  const isHomePage =
    pathWithoutQuery === "/" || pathWithoutQuery === "/userProfile" || pathWithoutQuery === "/dashboard";

  return (
    <Breadcrumb className="bc-main-wrap">
      {isHomePage ? (
        // <Breadcrumb.Item>Home</Breadcrumb.Item>
        ""
      ) : (
        <Breadcrumb.Item
          onClick={(e) => {
            if (currentRole === DEFAULT_ROLES.PARENT) {
              gotoHome(e, navigate);
            }else if (currentRole === DEFAULT_ROLES.SUPER_ADMIN){
              navigate("/all-application");
            }else{
              navigate("/dashboard");
            }
          }}>
            {(currentRole && currentRole !== DEFAULT_ROLES.PARENT && currentRole !== DEFAULT_ROLES.SUPER_ADMIN) ? "Admin" : (currentRole === DEFAULT_ROLES.SUPER_ADMIN)? "Super Admin" : "Home"}
        </Breadcrumb.Item>
      )}
      {pathNestedRoutes.map((path, index) => {
        return index === pathNestedRoutes.length - 1 ? (
          <Breadcrumb.Item
            key={index}
            //onClick={() => navigate(getLinkRef(index))}
            active
          ><span className="bc-lbl">
            {PageContent.CUSTOM_LINK_TITLES.hasOwnProperty(path)
              ? PageContent.CUSTOM_LINK_TITLES[path]
              : convertCamelCaseToPresentableText(path)}</span>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            key={index}
            onClick={() => navigate(getLinkRef(index))}
          ><span className="bc-lbl">
            {PageContent.CUSTOM_LINK_TITLES.hasOwnProperty(path)
              ? PageContent.CUSTOM_LINK_TITLES[path]
              : convertCamelCaseToPresentableText(path)}</span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
