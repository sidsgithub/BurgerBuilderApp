import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (prop) => {
    const ingredientSummary=Object.keys(prop.ingredients)
    .map(igKey=>{
        return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>:{prop.ingredients[igKey]}</li>
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>ur burger has these ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{prop.price.toFixed(2)}</strong></p>
            <p>Continue to bill</p>
            <Button btnType="Danger" clicked={prop.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={prop.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )

}

export default orderSummary;