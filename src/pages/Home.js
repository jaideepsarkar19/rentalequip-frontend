import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllEquipments } from '../redux/actions/equipmentActions'
import { Col, Row  , DatePicker, Checkbox} from 'antd'
import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
const {RangePicker} = DatePicker
function Home() {
    const {equipments} = useSelector(state=>state.equipmentReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalEquipments , setTotalequipments] = useState([])
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllEquipments())
    }, [])

    useEffect(() => {

        setTotalequipments(equipments)
        
    }, [equipments])


    function setFilter(values){

        var selectedFrom = moment(values[0] , 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1] , 'MMM DD yyyy HH:mm')

        var temp=[]

        for(var equipment of equipments){

              if(equipment.bookedTimeSlots.length == 0){
                  temp.push(equipment)
              }
              else{

                   for(var booking of equipment.bookedTimeSlots) {

                       if(selectedFrom.isBetween(booking.from , booking.to) ||
                       selectedTo.isBetween(booking.from , booking.to) || 
                       moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                       moment(booking.to).isBetween(selectedFrom , selectedTo)
                       )
                       {

                       }
                       else{
                           temp.push(equipment)
                       }

                   }

              }

        }


        setTotalequipments(temp)


    }

    return (
        <DefaultLayout>

             <Row className='mt-3' justify='center'>
                 
                 <Col lg={20} sm={24} className='d-flex justify-content-left'>

                     <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={setFilter}/>
                 
                 </Col>

             </Row>

              {loading == true && (<Spinner/>)}


              
              <Row justify='center' gutter={16}>

                   {totalEquipments.map(equipment=>{
                       return <Col lg={5} sm={24} xs={24}>
                            <div className="equipment p-2 bs1">
                               <img src={equipment.image} className="carimg"/>

                               <div className="equipment-content d-flex align-items-center justify-content-between">

                                    <div className='text-left pl-2'>
                                        <p>{equipment.name}</p>
                                        <p> Rent Per Hour {equipment.rentPerHour} /-</p>
                                    </div>

                                    <div>
                                        <button className="btn1 mr-2"><Link to={`/booking/${equipment._id}`}>Book Now</Link></button>
                                    </div>

                               </div>
                            </div>
                       </Col>
                   })}

              </Row>

        </DefaultLayout>
    )
}

export default Home
