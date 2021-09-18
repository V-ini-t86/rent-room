import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route }  from "react-router-dom"
import Home from './pages/Home';
import RoomDetails from './pages/RoomDetails';
import Error from './pages/Error'
import AddRoom from './pages/AddRoom'


const  App = () => {
  return (
    <>
     <Router>
       <Navbar />
       <Switch>
         <Route exact path="/" >
           <Home />
         </Route>
         <Route exact path="/room/create">
           <AddRoom />
         </Route>
         <Route exact path="/room/:id" >
           <RoomDetails />
         </Route>
         <Route>
           <Error />
         </Route>
       </Switch>
     </Router>
    </>
  );
}

export default App;
