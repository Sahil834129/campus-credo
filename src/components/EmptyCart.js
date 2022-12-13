import emptycartpic from "../assets/img/empty-cart-icon.png"
const EmptyCart = () => {
    return (
        <div className='empty-cart-wrapper'>
            <div className='pic-frame'><img className='school-logo' variant="center" src={emptycartpic} /></div>
            <h2>No schools selected yet!</h2>
            <h3>You have not seleted any school</h3>
            <h6>Please check out all available schools to <br />know details and apply for admission.</h6>
        </div>
    )
}

export default EmptyCart;
