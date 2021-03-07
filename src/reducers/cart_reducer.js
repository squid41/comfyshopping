import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type===ADD_TO_CART)
  {
    const {id,color,amount,product}=action.payload
    const tempItem=state.cart.find((i)=>i.id===id+color)
    if(tempItem)
    {
         const tempCart=state.cart.map((cartItem)=>{
           if(cartItem.id===id+color){
              let newa=cartItem.amount+amount
              if(newa>cartItem.max)
              newa=cartItem.max;
              return {...cartItem,amount:newa}
           }
           else{
             return cartItem
           }
         })
         return {...state,cart:tempCart}
    }
    else
    {
       const newItem={
         id:id+color,
         name:product.name,
         color,
         amount,
         image:product.images[0].url ,
         price:product.price,
         max:product.stock
       }
       return {...state,cart:[...state.cart,newItem]}
    }
  }
  if(action.type===REMOVE_CART_ITEM){
    const tempCart=state.cart.filter((item)=>item.id!==action.payload)
    return {...state,cart:tempCart}
  }
  if(action.type===CLEAR_CART){
   // const tempCart=state.cart.filter((item)=>item.id!==action.payload)
    return {...state,cart:[]}
  }
  if(action.type===TOGGLE_CART_ITEM_AMOUNT){
      console.log('hey')
    const {id,value}=action.payload
        const tempItem=state.cart.map((item)=>{
          if(item.id===id)
          {
            console.log(id)
               if(value==='inc')
               {
                  let x=item.amount+1;console.log('ko')
                  if(x>item.max)
                  {
                    x=item.max
                  }
                  //i.amount=x;
                  console.log(x);
                  return {...item,amount:x}
               } 
               else 
               {
                 let x=item.amount-1;
                  if(x<1)
                  {
                    x=1
                    
                  }
                  //i.amount=x
                  return {...item,amount:x}

               }
          }
          else
          {
            return item;
          }
        })
   return {...state,cart:tempItem}

  }
  if(action.type===COUNT_CART_TOTALS)
  {
    const {total_items,total_amount}=state.cart.reduce((total,cartItem)=>{
      const{amount,price}=cartItem
      total.total_items+=amount
      total.total_amount+=price*amount
      return total
    },{
      total_items:0,total_amount:0,
    })
   return{...state,total_items,total_amount}
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer