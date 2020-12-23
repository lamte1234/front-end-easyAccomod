import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './components/login.component';
import Home from './components/home.component';
import ChangePass from './components/change_password.component';

import Signup from './components/signup.component';
import RenterSU from './components/signup/renter.component';
import OwnerSU from './components/signup/owner.component';

import RenterWS from './components/workspace/renter.component';
import OwnerWS from './components/workspace/owner.component';
import AdminWS from './components/workspace/admin.component';

import Search from './components/renter_action/search.component';
import PostDetail from './components/renter_action/post_details';
import Wishlist from './components/renter_action/wislist.component';

import Post from './components/owner_action/post.component';
import OwnerPost from './components/owner_action/ownerPost.component';
import EditPost from './components/owner_action/editPost.component';
import AllPost from './components/owner_action/allPost.component';
import Extend from './components/owner_action/extend.component';
import ExtendAction from './components/owner_action/extendAction.component';
import OwnerNotification from './components/owner_action/notifications.component';

import AdminAcc from './components/admin_action/adminAccount.component';
import AdminPost from './components/admin_action/adminPost.component';
import AdminPostDetail from './components/admin_action/approvePost.component';
import EditAcc from './components/admin_action/approveEditAcc.component';
import AdminReport from './components/admin_action/adminReport.component';
import AdminNotifications from './components/admin_action/notifications.component';


function App() {
  return (
    <Router>
      {/* --------------------------COMMON--------------------------------- */}
      <Route path="/" exact component={Home}></Route>
      <Route path='/login/' exact component={Login}></Route>
      <Route path='/users/change-password' exact component={ChangePass}></Route>
      {/* ---------------------------SIGNUP--------------------------------- */}
      <Route path='/signup/' exact component={Signup}></Route>
      <Route path='/signup/renter/' exact component={RenterSU}></Route>
      <Route path='/signup/owner/' exact component={OwnerSU}></Route>
      {/* ----------------------------RENTER------------------------------ */}
      <Route path='/users/renter/' exact component={RenterWS}></Route>
      <Route path='/users/renter/search/' exact component={Search}></Route>
      <Route path='/users/renter/post/:id' exact component={PostDetail}></Route>
      <Route path='/users/renter/wishlist' exact component={Wishlist}></Route>
      {/* ---------------------------OWNER-------------------------------- */}
      <Route path='/users/owner/' exact component={OwnerWS}></Route>
      <Route path='/users/owner/post/' exact component={Post}></Route>
      <Route path='/users/owner/edit' exact component={OwnerPost}></Route>
      <Route path='/users/owner/edit/:id' exact component={EditPost}></Route>
      <Route path='/users/owner/all-post' exact component={AllPost}></Route>
      <Route path="/users/owner/extend/" exact component={Extend}></Route>
      <Route path="/users/owner/extend/:id" exact component={ExtendAction}></Route>
      <Route path="/users/owner/notifications" exact component={OwnerNotification}></Route>
      {/* ----------------------------ADMIN--------------------------------------- */}
      <Route path='/users/admin/' exact component={AdminWS}></Route>
      <Route path='/users/admin/accounts/' exact component={AdminAcc}></Route>
      <Route path='/users/admin/posts/' exact component={AdminPost}></Route>
      <Route path='/users/admin/report/' exact component={AdminReport}></Route>
      <Route path='/users/admin/posts/:id' exact component={AdminPostDetail}></Route>
      <Route path='/users/admin/edit-auth/' exact component={EditAcc}></Route>
      <Route path='/users/admin/notifications' exact component={AdminNotifications}></Route>
    </Router>
  );
}

export default App;
