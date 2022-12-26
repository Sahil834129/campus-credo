import React from "react";
import PageContent from "../../resources/pageContent";

const SchoolExtracurriculars = ({schoolCategoryExtracurricularMap}) => {
    return (
        <>
        <h2>Extracurriculars</h2>
        
        {
            Object.entries(schoolCategoryExtracurricularMap).map(([key,values],index)=>{
                return (
                    <div className="facility-row" key={"featureHeader_"+index}>
                        <h2>{key}</h2>
                        <ul>
                            {
                               values.map((value, i) => {
                                    let fIcon = PageContent.EXTRACURRICULAR_ICON_MAP.hasOwnProperty(value) ? PageContent.EXTRACURRICULAR_ICON_MAP[value] : null;
                                    return <li key={"featureName_"+i}><i className={'icons ' + (fIcon !== null ? fIcon : 'boarding-icon')}></i><label>{value}</label></li>
                               })
                            }
                        </ul>
                    </div>
                )
            })
        }
      
        </>
    )
}

export default SchoolExtracurriculars;