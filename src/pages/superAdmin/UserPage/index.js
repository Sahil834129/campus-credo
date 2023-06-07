import Layout from "../../admin/layout"
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { getSearchItems, getUserData, updateUserExcelData } from "../../../utils/services";
import { useEffect } from "react";
import TableComponent from "../../../common/TableComponent";
import { humanize } from "../../../utils/helper";
import Loader, { hideLoader, showLoader } from "../../../common/Loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const Users = () => {
    const [searchItems, setSearchItems] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(true);
    const [userSchoolId, setUserSchoolId] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [selectedRows, setSelectedRows] = useState({});
    const dispatch = useDispatch();
    const click = useRef();

    const handleOnSelect = (item) => {
        if (item.id) {
            setUploadStatus(false)
            setUserSchoolId(item.id)
        }
    };

    const handleOnSearch = (item) => {
    };

    const handleUpload = async (e) => {
        setUploadStatus(true);
        showLoader(dispatch);
        const data = e.target.files[0]
        try {
            let userData = new FormData();
            userData.append("file", data);
            userData.append("schoolId", userSchoolId)
            const response = await updateUserExcelData(userData)
            e.target.value = null;
            if (response) {
                hideLoader(dispatch);
                setUploadStatus(false)
            }
        } catch (error) {
            hideLoader(dispatch);
            e.target.value = null;
            toast.error(error?.response?.data?.apierror?.message || "Something went wrong")
            setUploadStatus(false)
        }
        fetchUserData(userSchoolId)
        hideLoader(dispatch)
    }

    const fetchUserData = async (schoolId) => {
        showLoader(dispatch);
        try {
            if (schoolId) {
                const response = await getUserData(schoolId);
                setRowData(response.data);
                hideLoader(dispatch);
            }
        }
        catch (e) {
            hideLoader(dispatch);
        }

    }

    const fetchSearchItem = async () => {
        const response = await getSearchItems()
        if (response) {
            setSearchItems(response.data.map((val, index) => ({ name: val.name, id: val.schoolId })))
        } else {
            console.log('NO DATA ')
        }
    }


    useEffect(() => {
        if (userSchoolId)
            fetchUserData(userSchoolId)
    }, [userSchoolId])

    const columns = [
        {
            accessor: 'schoolId',
            Header: 'School ID'
        },
        {
            accessor: 'userId',
            Header: 'User ID',
        },
        {
            accessor: '',
            Header: 'Full Name',
            Cell: ((e) => {
                return (
                    <div>
                        <span style={{ color: '#41285F' }}>{`${e.row.original?.firstName} ${e.row.original?.lastName}`}</span>
                    </div>
                );
            })
        },
        {
            accessor: 'email',
            Header: 'Email'
        },
        {
            accessor: 'phone',
            Header: 'Phone Number'
        },
        {
            accessor: '',
            Header: 'Roles',
            Cell: ((e) => {
                const rolesName = e.row.original?.roles.join(',')
                return <span style={{ color: '#41285F' }}>{`${humanize(rolesName)}`}</span>
            })
        }


    ]

    useEffect(() => {
        fetchSearchItem()
    }, [])

    return (
        <Layout>
            <Col className="navbar-header">
                <Container className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, paddingRight: 0 }}>
                    <div className="search-wrapper">
                        <div className="search-inner" style={{ width: 500, marginTop: 4, marginBottom: 4, }}>
                            <ReactSearchAutocomplete
                                items={searchItems}
                                onSelect={handleOnSelect}
                                onSearch={handleOnSearch}
                                styling={{ zIndex: 4 }}
                                placeholder='Search Schools'
                            />
                        </div>
                    </div>
                    <div className="search-wrapper" style={{ margin: 0, padding: 0 }}>
                        <div className="search-inner" style={{ marginTop: 4, marginBottom: 4 }}>
                            <Button
                                component="label"
                                onClick={() => click.current.click()}
                                disabled={uploadStatus}
                            >
                                UPLOAD FILE
                                <input
                                    accept=".xlsx, .xls, .csv"
                                    type="file"
                                    hidden
                                    ref={click}
                                    onChange={handleUpload}
                                    disabled={uploadStatus}
                                />
                            </Button>
                        </div>
                    </div>
                </Container>
            </Col>
            <div className='inner-content-wrap' style={{ minHeight: '200px', margin: '20px' }}>
                <div className='table-wrapper-outer'>
                    <Loader />
                    <TableComponent
                        columns={columns}
                        data={rowData}
                        showSelectedAll={false}
                        selectedRows={selectedRows}
                        onSelectedRowsChange={setSelectedRows}
                    />
                </div>
            </div>
        </Layout>
    )
}
export default Users;