import React, { useEffect, useState } from 'react'
import {
    Button, Col, Container,
    Row, Table
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Breadcrumbs from '../common/Breadcrumbs'
import ConfirmDialog from '../common/ConfirmDialog'
import Layout from '../common/layout'
import LeftMenuBar from '../common/LeftMenuBar'
import AddChildDialog from '../dialogs/addChild'
import { getChildsList } from '../redux/actions/childAction'
import RestEndPoint from '../redux/constants/RestEndpoints'
import PageContent from '../resources/pageContent'
import { isLoggedIn } from '../utils/helper'
import RESTClient from '../utils/RestClient'

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
                                <div className='top-btn-wrap managechild-title'>
                                   <h2>All Child</h2>
                                    <Button
                                        className='add-child-btn'
                                        onClick={() => {setShowEditChildDialog(true); setSelectedChild(null)}}
                                    >
                                        Add Child
                                    </Button>
                                   
                                </div>
                                <div className='manage-child-tbl-outer'>
                                <Table bordered hover className='table-container'>
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
                                                        <div className="btn-wrapper">
                                                            <Button className='edit' onClick={()=> editChild(child)}>Edit</Button>
                                                            <Button className='delete' onClick={()=> deleteChild(child)}>Delete</Button>
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