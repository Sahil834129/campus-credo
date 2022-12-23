export default function ParentGuardianTab({ parentDetail }) {
  return (
    <>
      <div className="admin-detail-row">
        <div className="admin-detail-cell">
          <label>Name </label>
          <span className="item-entry">
            {parentDetail?.firstName}{" "}
            {parentDetail?.lastName}
          </span>
        </div>
        <div className="admin-detail-cell">
          <label>Gender </label>
          <span className="item-entry">
            {parentDetail?.gender}
          </span>
        </div>
        <div className="admin-detail-cell">
          <label>DOB </label>
          <span className="item-entry">
            {parentDetail?.dateOfBirth}
          </span>
        </div>
      </div>
      <div className="admin-detail-row">
        <div className="admin-detail-cell">
          <label>Relation </label>
          <span className="item-entry">
            {parentDetail?.relation}
          </span>
        </div>
        <div className="admin-detail-cell">
          <label>Marital Status </label>
          <span className="item-entry">
            {parentDetail?.maritalStatus}
          </span>
        </div>
        <div className="admin-detail-cell">
          <label>Nationality </label>
          <span className="item-entry">
            {parentDetail?.nationality}
          </span>
        </div>
      </div>
      <div className="admin-detail-row">
        <div className="admin-detail-cell">
          <label>Qualification </label>
          <span className="item-entry">
            {parentDetail?.qualification}
          </span>
        </div>
        <div className="admin-detail-cell">
          <label>Occupation </label>
          <span className="item-entry">
            {parentDetail?.occupation}
          </span>
        </div>
      </div>
      <div className="admin-detail-row">
        <div className="admin-detail-cell">
          <label>Annual Family Income </label>
          <span className="item-entry">
            {parentDetail?.annualFamilyIncome}
          </span>
        </div>

      </div>
    </>
  );
}