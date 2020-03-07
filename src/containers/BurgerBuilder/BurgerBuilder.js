import React,{ Component } from "react";
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Model/Model'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from  '../../components/UI/Spinner/Spinner'

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
        purchasing:false,
        loading : false
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
    //    alert('You continue')
    this.setState( { loading:true } );

        const order={
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : '',
                address : {
                    street : '',
                    zipcode : '',
                    country : ''
                },
                email : '',
            },
            deliveryMethod : '',
        }
        axios.post('/orders.json',order)
        .then(response =>{ this.setState( { loading:false,purchasing:false } );
    } ) 
        .catch(error => {this.setState( { loading:false,purchasing:false } );
    });
    }


    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary = <OrderSummary ingredients={this.state.ingredients} purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>;

        if(this.state.loading){
            orderSummary = <Spinner/>;

        }
       return(
           <Aux>
               <Model show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
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