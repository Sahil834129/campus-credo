import CartItemCard from "./CartItemCard";
import "../assets/scss/custom-styles.scss";
import EmptyCart from "./EmptyCart";

const CartItemsGrid = (props) => {
    return (
        <>
            {
                props.selectedChild.cartItems.length ?
                    <div className='school-list-container'>
                        {
                            props.selectedChild.cartItems.map((cartItem, index) => (
                                <CartItemCard cartItem={cartItem} handleChildSelection={props.handleChildSelection} childId={props.selectedChild.id} key={"cartItem_" + index} />
                            ))
                        }   
                    </div>
                : <EmptyCart/>
            }
        </>
    )
}

export default CartItemsGrid;