import { useState } from "react";
import Layout from "../../admin/layout"
import SuperAdminFilterApp from "./filterAppSuperAdmin";
import ShowSuperAdminApp from "./showSuperAdminApp";

const SuperAdmin = () => {
  const [rowsData, setRowsData] = useState([])

  return (
    <Layout >
      <div className='content-area-inner manage-application inner-page-outer'>
        <div className='internal-page-wrapper two-columns'>
          <SuperAdminFilterApp rowsData={rowsData} setRowsData={setRowsData}/>
          <ShowSuperAdminApp rowsData={rowsData} setRowsData={setRowsData}/>
        </div>
      </div>
    </Layout>
  )
}
export default SuperAdmin;