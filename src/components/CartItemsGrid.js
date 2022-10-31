import CartItemCard from "./CartItemCard";
import NoRecordsFound from "../common/NoRecordsFound";

const CartItemsGrid = (props) => {
    return (
        <div className='school-list-container'>
            {
                props.selectedChild.cartItems.length ?
                    props.selectedChild.cartItems.map((cartItem, index) => (
                        <CartItemCard cartItem={cartItem} handleChildSelection={props.handleChildSelection} childId={props.selectedChild.id} key={"cartItem_" + index} />
                    ))
                    : <NoRecordsFound message={"No applications in cart"} />
            }
        </div>
    )
}

export default CartItemsGrid;