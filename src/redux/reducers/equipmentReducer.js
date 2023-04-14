const initialData = {
    cars : [],

};

export const equipmentReducer = (state=initialData , action)=>{

     switch(action.type)
     {
         case 'GET_ALL_EQUIPMENTS' : {
             return{
                 ...state,
                 equipments : action.payload
             }
         }
         
         default:return state
     }

}

