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
    .filter((v) => v.length > 0 && v !== "userProfile");
  const getLinkRef = (index) => {
    return "/" + pathNestedRoutes.slice(0, index + 1).join("/");
  };

  const isHomePage =
    pathWithoutQuery === "/" || pathWithoutQuery === "/userProfile";

  return (
    <Breadcrumb className="bc-main-wrap">
      {isHomePage ? (
        ""
      ) : (
        <Breadcrumb.Item
          onClick={(e) => {
            if (currentRole === DEFAULT_ROLES.PARENT) {
              gotoHome(e, navigate);
            }else{
              navigate("/dashboard");
            }
          }}>
            {(currentRole !== DEFAULT_ROLES.PARENT) ? "Admin" : "Home"}
        </Breadcrumb.Item>
      )}
      {pathNestedRoutes.map((path, index) => {
        return index === pathNestedRoutes.length - 1 ? (
          <Breadcrumb.Item
            key={index}
            onClick={() => navigate(getLinkRef(index))}
            active
          >
            {PageContent.CUSTOM_LINK_TITLES.hasOwnProperty(path)
              ? PageContent.CUSTOM_LINK_TITLES[path]
              : convertCamelCaseToPresentableText(path)}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            key={index}
            onClick={() => navigate(getLinkRef(index))}
          >
            {PageContent.CUSTOM_LINK_TITLES.hasOwnProperty(path)
              ? PageContent.CUSTOM_LINK_TITLES[path]
              : convertCamelCaseToPresentableText(path)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
