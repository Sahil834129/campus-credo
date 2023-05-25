import { useState } from "react";
import Layout from "../../admin/layout"
import SuperAdminFilterApp from "./filterAppSuperAdmin";
import ShowSuperAdminApp from "./showSuperAdminApp";
import { superAdminApplicationfilterData } from "../../../utils/services";
import Loader, { hideLoader, showLoader } from "../../../common/Loader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const SuperAdmin = () => {
  const [rowsData, setRowsData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [filter, setFilter] =useState([])
  const dispatch = useDispatch();

  const fetchRowData = (filter =[], currentPage) => {
    console.log('filter', filter)
    showLoader(dispatch)
    const filterPayload = {};
    filterPayload['filters'] = filter;
    filterPayload['limit'] = 10;
    filterPayload['offset'] = currentPage || 1;
    superAdminApplicationfilterData(filterPayload)
      .then(res => {
        console.log(res.data)
        setRowsData(res.data.applicationDataDtos || []); 
        setActivePage(currentPage || 1);
        setTotalRows(res.data.count || 0);
        setFilter(filter)
        hideLoader(dispatch)
      })
      .catch(err => {console.log(err); hideLoader(dispatch)})
  }

  useEffect(() => {
    fetchRowData(filter, activePage)
  }, [activePage])
  
  return (
    <Layout >
      <div className='content-area-inner manage-application inner-page-outer'>
        <div className='internal-page-wrapper two-columns'>
          <Loader/>
          <SuperAdminFilterApp 
            fetchRowData={fetchRowData} 
          />
          <ShowSuperAdminApp 
            rowsData={rowsData} 
            setRowsData={setRowsData} 
            fetchRowData={fetchRowData} 
            filter={filter}
            totalRows={totalRows}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>
    </Layout>
  )
}
export default SuperAdmin;