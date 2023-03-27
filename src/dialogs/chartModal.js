import ApprovedAcceptedGraph from "../pages/admin/dashboard/approvedAcceptedGraph";
import GenericDialog from "./GenericDialog";


export const ChartModal = (props) => {
    console.log("chart modal prop", props);

    return (
        <GenericDialog className='confirmation-modal' show={props.show} handleClose={props.handleClose}>
            <div className='modal-body-col'>
                <div>
                    <ApprovedAcceptedGraph acceptedOffer={props.acceptedOffer} applicationApproved={props.applicationApproved} labels={props.labels} hideLabel={true} />
                </div>
            </div>
        </GenericDialog>
    );
};

export default ChartModal;