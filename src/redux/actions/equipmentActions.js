import { message } from 'antd';
import axios from 'axios';

export const getAllEquipments=()=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.get('/api/equipment/getallequipments')
        dispatch({type: 'GET_ALL_EQUIPMENTS', payload:response.data})
        dispatch({type: 'LOADING' , payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }

}

export const addEquipment=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
         await axios.post('/api/equipment/addequipment' , reqObj)
       
         dispatch({type: 'LOADING' , payload:false})
         message.success('New equipment added successfully')
         setTimeout(() => {
            window.location.href='/admin'
         }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
      

}

export const editEquipment=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
         await axios.post('/api/equipment/editequipment' , reqObj)
       
         dispatch({type: 'LOADING' , payload:false})
         message.success('Equipment details updated successfully')
         setTimeout(() => {
            window.location.href='/admin'
         }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
      

}

export const deleteEquipment=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
         await axios.delete('/api/equipment/deleteequipment/'+reqObj.carid)
       
         dispatch({type: 'LOADING' , payload:false})
         message.success('Equipment deleted successfully')
         setTimeout(() => {
            window.location.reload()
         }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
      

}