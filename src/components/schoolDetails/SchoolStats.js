import React from "react";

const SchoolStats = (props) => {
  const schoolDetails = props.schoolDetails;
  return (
    <>
      <h2>Academic Stats</h2>
      <div className="academic-stats-content">
        <div className="academic-stats-row">
          <div className="cell">
            <div className="item-cell title">Board</div>
            <div className="item-cell particular">{schoolDetails.board || "NA"}</div>
          </div>
          <div className="cell">
            <div className="item-cell title">Parent Group</div>
            <div className="item-cell particular">{schoolDetails.parentGroup || "NA"}</div>          
          </div>
          
        </div>
        <div className="academic-stats-row">
          <div className="cell">
            <div className="item-cell title">School Level</div>
            <div className="item-cell particular">
              {schoolDetails.schoolLevel || "NA"}
            </div>
          </div>
          <div className="cell">
            <div className="item-cell title">Gender</div>
            <div className="item-cell particular">{schoolDetails.gender || "NA"}</div>
          </div>
          
        </div>
        <div className="academic-stats-row">
          <div className="cell">
              <div className="item-cell title">Establishment Year</div>
              <div className="item-cell particular">
                {schoolDetails.yearEstablishedIn || "NA"}
              </div>
            </div>
            <div className="cell">
              <div className="item-cell title">School Format</div>
              <div className="item-cell particular">{schoolDetails.schoolType || "NA"}</div>
            </div>
        </div>
        <div className="academic-stats-row">
          <div className="cell">
            <div className="item-cell title"> Medium of Instruction</div>
            <div className="item-cell particular">
              {schoolDetails.mediumOfInstruction || "NA"}
            </div>
          </div>
          <div className="cell">
            <div className="item-cell title">Academic Session</div>
            <div className="item-cell particular">
              {schoolDetails?.admissionInfo?.map((val)=><div className="session_year">{val.admissionSession}</div>) || "NA"}
            </div>
          </div>
          
        </div>
        <div className="academic-stats-row">
          <div className="cell">
            <div className="item-cell title">Student/Teacher Ratio</div>
            <div className="item-cell particular">
              {schoolDetails.studentTeacherRatio || "NA"}
            </div>
          </div>
          <div className="cell">
            <div className="item-cell title">School Timings</div>
            <div className="item-cell particular">
              {schoolDetails.schoolTimings || "NA"}
            </div>
          </div>
          
        </div>
        <div className="academic-stats-row">
          <div className="single-row">
              <div className="item-cell title">Admission open for</div>
              <div className="item-cell particular adm-status">
                {schoolDetails.admissionInfo ? schoolDetails.admissionInfo?.map((val)=> <div className="adm-sessions">{ 
                // val.admissionStatus +
                    // " For " +
                    val.admissionSession
                }</div>)  : "NA"
                }
              </div>
            </div>
        </div>
        <div className="academic-stats-row">
          
          <div className="single-row">
            <div className="item-cell title">Academic Performance</div>
            <div className="item-cell particular">
              {schoolDetails.academicPerformancePerc || "NA"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolStats;
