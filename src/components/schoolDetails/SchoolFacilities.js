import React from "react";
import PageContent from "../../resources/pageContent";

const SchoolFacilities = ({ facilities }) => {
  return (
    <>
      <h2>Facilities</h2>
      <div className="facility-row">
        <ul>
          {facilities.map((facility, i) => {
            let fIcon = PageContent.FACILITY_ICON_MAP.hasOwnProperty(
              facility.facilityName
            )
              ? PageContent.FACILITY_ICON_MAP[facility.facilityName]
              : null;
            return (
              <li key={"featureName_" + i}>
                <i
                  className={
                    "icons " + (fIcon !== null ? fIcon : "boarding-icon")
                  }
                ></i>
                <label>{facility.facilityName}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SchoolFacilities;
