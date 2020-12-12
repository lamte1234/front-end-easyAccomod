import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './components/login.component';
import Signup from './components/signup.component';
import RenterSU from './components/signup/renter.component';
import OwnerSU from './components/signup/owner.component';
import RenterWS from './components/workspace/renter.component';
import OwnerWS from './components/workspace/owner.component';
import AdminWS from './components/workspace/admin.component';
import Navbar from './components/navbar.component';
import Post from './components/post.component';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Route path="/"><Navbar /></Route>
      <Route path='/login/' exact component={Login}></Route>
      <Route path='/signup/' exact component={Signup}></Route>
      <Route path='/signup/renter/' exact component={RenterSU}></Route>
      <Route path='/signup/owner/' exact component={OwnerSU}></Route>
      <Route path='/users/owner/post' exact component={Post}></Route>
      <Route path='/users/renter/:id' exact component={RenterWS}></Route>
      <Route path='/users/owner/:id' exact component={OwnerWS}></Route>
      <Route path='/users/admin/:id' exact component={AdminWS}></Route>
    </Router>
  );
}

export default App;
