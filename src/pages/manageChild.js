import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../common/layout'
import Breadcrumbs from '../common/Breadcrumbs'
import LeftMenuBar from '../common/LeftMenuBar'
import PageContent from '../resources/pageContent'
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from '../utils/helper'
import { getChildsList} from '../redux/actions/childAction'
import AddChildDialog from '../dialogs/addChild'
import ConfirmDialog from '../common/ConfirmDialog'
import RESTClient from '../utils/RestClient'
import { toast } from 'react-toastify'
import RestEndPoint from '../redux/constants/RestEndpoints'
import {
    Container,
    Row,
    Col,
    Table,
    Button,
} from "react-bootstrap"

const ManageChild = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const childs = useSelector((state) => state.childsData.childs)
    const [showEditChildDialog, setShowEditChildDialog] = useState(false)
    const [selectedChild, setSelectedChild] = useState()
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false)
    
    useEffect(()=> {
        isLoggedIn() ? dispatch(getChildsList()) : navigate('/?login=true')
    } ,[dispatch, navigate])

    function editChild(child) {
       setSelectedChild(child)
       setShowEditChildDialog(true)
        
    }

    const deleteChild= async(child) => {
        setSelectedChild(child)
        setShowConfirmDeleteDialog(true)
    }

    const handleDeleteChildConfirm = async() => {
        try {
            await RESTClient.delete(RestEndPoint.UPDATE_CHILD + '/' + selectedChild.childId)
            toast.success("Child deleted successfully.")
            dispatch(getChildsList())
        } catch (error) {
            toast.error(RESTClient.getAPIErrorMessage(error))
        }
        setShowConfirmDeleteDialog(false)
    }
    
    return (
        <>
         <Layout>
            <section className='content-area'>
                <Container className='content-area-inner profile-page-wrap'>
                    <Col className='inner-page-content'>
                        <Row className='content-section profile-bc-section'>
                            <Col className='bc-col'>
                                <Breadcrumbs />
                            </Col>
                        </Row>
                        <Row className='content-section profile-content-main'>
                            <Col className='left profile-sidebar'>
                                <LeftMenuBar menuItems={PageContent.USER_PROFILE_SIDEBAR_MENU_ITEMS} />
                            </Col>
                            <Col className='profile-content right'>
                                <div className='border-bottom top-btn-wrap'>
                                   
                                    <Button
                                        className='add-child-btn'
                                        onClick={() => {setShowEditChildDialog(true); setSelectedChild(null)}}
                                    >
                                        Add Child
                                    </Button>
                                   
                                </div>
                                <div className='mt-3'>
                                <Table bordered hover className='document-tbl'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Date of birth</th>
                                            <th>Gender</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            childs.map((child, index) => {
                                                return <tr key={'childTbl_'+index}>
                                                    <td>{index+1}</td>
                                                    <td>{child.firstName}</td>
                                                    <td>{child.lastName}</td>
                                                    <td>{child.dateOfBirth}</td>
                                                    <td>{child.gender}</td>
                                                    <td>
                                                        <div className="button-wrapper">
                                                            <Button className='save comn me-2' onClick={()=> editChild(child)}>Edit</Button>
                                                            <Button className='btn btn-danger' onClick={()=> deleteChild(child)}>Delete</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </Table>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </section>
        </Layout>
        <AddChildDialog
            show={showEditChildDialog}
            child= {selectedChild}
            handleClose={()=>setShowEditChildDialog(false)}
          />
        <ConfirmDialog show={showConfirmDeleteDialog} message='Are you sure to delete?'
            handleConfirm={handleDeleteChildConfirm}
            handleClose={()=>setShowConfirmDeleteDialog(false)}
        />
        </>
    )
}

export default ManageChild;