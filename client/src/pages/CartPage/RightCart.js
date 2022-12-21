import React from 'react'

const RightCart = () => {
  return (
    <section id='right-cart'>
        <div className='card-details'>
            <div className='card-details_title'>
                <h3>Card Details</h3>
            </div>

            <div className='card-details_info'>
                <form>
                    <label for='fname'>Name on card</label>
                    <input id='fname' type='text' placeholder='Name'/>

                    <label for='fcard'>Card Number</label>
                    <input id='fcard' type='number' placeholder='1111 2222 3333 4444'/>

                    <div className='card-details_group'>
                        <div>
                            <label for='fexp'>Expiration date</label>
                            <input id='fexp' type='number'
                            placeholder='mm/yy'/>
                        </div>

                        <div>
                            <label for='fcv'>CV</label>
                            <input id='fcv' type='number'
                            placeholder='123'/>
                        </div>
                    </div>
                </form>

                <hr/>

                <div className='card-details_total'>
                    <div>
                        <h5>Subtotal</h5>
                        <p>$20</p>
                    </div>

                    <div>
                        <h5>Shipping</h5>
                        <p>$5</p>
                    </div>

                    <div>
                        <h5>Total</h5>
                        <p>$25</p>
                    </div>

                    <button>Checkout</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default RightCart