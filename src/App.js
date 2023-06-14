import { Routes, Route } from "react-router-dom";
import Navbar from "./Users-components/Navbar";
import UserList from "./Users-components/Userlist";
import NewPlaces from "./Places-components/Place";
import NotFound from "./Users-components/notfound";
import PlaceList from "./Places-components/Placelist";
import UpdatePlaces from "./Places-components/updatePlaces";
import Auth from "./Users-components/Auth/Auth";
import ResetPass from "./Users-components/Auth/Reset-pass";



const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Navbar/>}>
        <Route index element={<UserList/>}/>
        <Route path="/Places/new" element={<NewPlaces/>}/>
        <Route path="/:userId/Places" element={<PlaceList/>}/>
        <Route path="/places/:placeId" element={<UpdatePlaces/>}/>
        <Route path="Auth" element={<Auth/>} />
        <Route path="ResetPass" element={<ResetPass/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
 
export default App;