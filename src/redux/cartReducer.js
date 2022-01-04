//child reducer
const initialState={
    cartItems: []
}


export const cartReducer=(state=initialState,action)=>{

    //wheater it is add or delete or whatever action it is
    switch(action.type){

        case 'ADD_TO_CART':{      //add_to_cart button click holey ADD_TO_CART action call hobey
            return{
                ...state,
                cartItems:[...state.cartItems,action.payload]
            }
        }
        case 'DELETE_FROM_CART':{      //delete_from_cart button click holey DELETE_From_CART action call hobey
            return{
                ...state,
                cartItems:state.cartItems.filter(obj=>obj.id !== action.payload.id) //id match holey item delete hobey remaining item thekey jabey
            }
        }
        default: return state
    }
}