import ApprovedAcceptedGraph from "../pages/admin/dashboard/approvedAcceptedGraph";
import GenericDialog from "./GenericDialog";


export const ChartModal = (props) => {

    return (
        <GenericDialog className='confirmation-modal chart-modal' show={props.show} handleClose={props.handleClose} modalHeader="Applications Approved Vs Offers Accepted">
            <div className='modal-body-col'>
                <div>
                    <ApprovedAcceptedGraph acceptedOffer={props.acceptedOffer} applicationApproved={props.applicationApproved} labels={props.labels} hideLabel={true} />
                </div>
            </div>
        </GenericDialog>
    );
};

export default ChartModal;