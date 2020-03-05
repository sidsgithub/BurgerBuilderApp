import React,{ Component } from "react";
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Model/Model'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const ingprice={
    salad:0.5,
    cheese:0.4,
    meat:1,
    bacon:0.9
}


class BurgerBuilder extends Component{
    state={
        ingredients:{
            cheese:0,
            salad:0,
            meat:0,
            bacon:0
        },
        totalPrice:3,
        purchase:false,
        purchasing:false
    }

    updatePurchaseState(ingredients){
       
        const sum=Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]
        }).reduce((p,curr)=>{
            return p+curr
        },0)
        this.setState({purchase:sum>0});
    }

    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount =oldCount +1;
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount
        const priceAddition=ingprice[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){
            return}
        const updatedCount =oldCount -1;
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount
        const priceAddition=ingprice[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
       alert('you can continue')
    }


    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
       return(
           <Aux>
               <Model show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   <OrderSummary ingredients={this.state.ingredients} purchaseCancelled={this.purchaseCancelHandler}
                   purchaseContinued={this.purchaseContinueHandler}
                   price={this.state.totalPrice}/>
               </Model>
               <Burger ingredients={this.state.ingredients}/>
               <BuildControls
               ingreAdded={this.addIngredientHandler} ingreRemoved={this.removeIngredientHandler}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               purchase={this.state.purchase}
               ordered={this.purchaseHandler}
               />
           </Aux>
       ); 
    }

}
export default BurgerBuilder;