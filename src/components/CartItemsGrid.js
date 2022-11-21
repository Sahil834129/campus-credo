import CartItemCard from "./CartItemCard";
import "../assets/scss/custom-styles.scss";
import EmptyCart from "./EmptyCart";

const CartItemsGrid = (props) => {
    return (
        <div className='school-list-container'>
            {
                props.selectedChild.cartItems.length ?
                    props.selectedChild.cartItems.map((cartItem, index) => (
                        <CartItemCard cartItem={cartItem} handleChildSelection={props.handleChildSelection} childId={props.selectedChild.id} key={"cartItem_" + index} />
                    ))
                    : <EmptyCart/>
            }
        </div>
    )
}

export default CartItemsGrid;