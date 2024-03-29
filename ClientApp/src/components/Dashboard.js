import { useState } from 'react';
import { connect , useDispatch} from 'react-redux'
import {authenticateUsers, logoutUser, resetLogin } from '../redux/user/userAction'
import Login from './Login'
import Employees from './Employees'

// function Dashboard() {
  const Dashboard = (props) => {
    const dispatch = useDispatch();
  const viewCallBackHandler = (type, data) => {
    switch(type) {
      case "Login_task":
        dispatch(authenticateUsers(data));
        break;
      case "Reset_login_form":
        dispatch(resetLogin())
      default:
      }
    };
    const  ClearStore = () => {
    localStorage.clear();
  //  this.logOut();
    window.location.reload();
    alert('storage cleared !')
  }

  const logOut =() =>{
    dispatch(logoutUser())
  }
  
 let isSignedInUser =  false 
  return (
    <div>
      <div className="headerDiv">
        {isSignedInUser = props.state.user &&  props.state.user.prinicleUser}
      <div  style={{color: "red", margin: "10px", fontWeight:"bold"}}>
                {isSignedInUser ?
                'Welcome ' +  isSignedInUser  
                :
                'Please login ' }  
        </div>
        <div> 
          {isSignedInUser && 
              <button onClick={logOut}>Logout</button>
          }
      </div>
        <div>
          <button onClick={ClearStore}>Clear storage</button>
        </div>
      </div>
          <div>
              {props.state.user && props.state.user.isAuthenticated &&
              <Employees />   }
          </div>

        { props.state.user && !props.state.user.prinicleUser &&
              <Login 
              loginError = {props.state.user.error}
              callbackHandler={viewCallBackHandler}
              // if parent need not filter out child's requests 
            /> 
          }
  </div>
  )
}
  const mapStateToProps = state => {
    return {
        state : state
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: (x) =>  dispatch(logoutUser(x)) ,
        authenticateUsers: (loginInfo) =>  dispatch(authenticateUsers(loginInfo)) ,
        resetToInitialState: () =>  dispatch(resetLogin()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
