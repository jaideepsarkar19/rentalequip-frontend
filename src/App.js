//import logo from './logo.svg';
import './App.css';
import { Route, Routes,Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingEquipment from './pages/BookingEquipment'
// import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddEquipment from './pages/AddEquipment';
import AdminHome from './pages/AdminHome';
import EditEquipment from './pages/EditEquipment';

function App() {
  return ( 
   
      <Routes>
        <Route path='/' exact element={ <Home/>} />
        <Route path='/login' exact element={<Login/>} />   
          <Route path='/register' exact element={<Register/>} />
          <Route path='/booking/:equipmentid' exact element={<BookingEquipment/>} />
        <Route path='/userbookings' exact element={<UserBookings/>} />
        <Route path='/addequipment' exact element={<AddEquipment/>} />
        <Route path='/editequipment/:equipmentid' exact element={<EditEquipment/>}/>
        <Route path='/admin' exact element={<AdminHome/>} />
     </Routes>
        
     
    
  );
}
export default App;

export function Router(props) {

  if (localStorage.getItem('user')) {
    return <Route {...props} />
  }
  else {
    return <Navigate to='/login' />
  }

}
