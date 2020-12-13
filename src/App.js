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
import Search from './components/renter_action/search.component';
import Post from './components/owner_action/post.component';
import AdminAcc from './components/admin_action/adminAccount.component';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Route path="/" exact component={Navbar}></Route>
      <Route path='/login/' exact component={Login}></Route>
      <Route path='/signup/' exact component={Signup}></Route>
      <Route path='/signup/renter/' exact component={RenterSU}></Route>
      <Route path='/signup/owner/' exact component={OwnerSU}></Route>
      <Route path='/users/owner/post/' exact component={Post}></Route>
      <Route path='/users/renter/' exact component={RenterWS}></Route>
      <Route path='/users/renter/search/' exact component={Search}></Route>
      <Route path='/users/owner/' exact component={OwnerWS}></Route>
      <Route path='/users/admin/' exact component={AdminWS}></Route>
      <Route path='/users/admin/accounts/' exact component={AdminAcc}></Route>
    </Router>
  );
}

export default App;
