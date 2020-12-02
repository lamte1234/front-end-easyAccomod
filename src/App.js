import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/navbar.component';
import Login from './components/login.component';
import Signup from './components/signup.component';
import RenterSU from './components/signup/renter.component';
import OwnerSU from './components/signup/owner.component'

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path='/login/' exact component={Login}></Route>
      <Route path='/signup/' exact component={Signup}></Route>
      <Route path='/signup/renter/' exact component={RenterSU}></Route>
      <Route path='/signup/owner/' exact component={OwnerSU}></Route>
    </Router>
  );
}

export default App;
