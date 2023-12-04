import React, { useContext } from "react";
import AuthGlobal from '../context/store/AuthGlobal'
import GuestNavigator from "./GuestNavigator";
import { AdminNavigator } from "./AdminNavigator";
import UserNavigator from "./UserNavigator";

const screenOptions = {
    tabBarShowLabel:false,
    headerShown:false,
    tabBarStyle:{
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 60,
      background: "#fff"
    }
  }

const Main = () => {
    const context = useContext(AuthGlobal)
    console.log(context)
    console.log(context.stateUser.isAuthenticated)
    if (context.stateUser.isAuthenticated === null || context.stateUser.isAuthenticated === false)
    {
      return(<GuestNavigator/>)
    }
    else if (context.stateUser.userProfile.role === 'student' || context.stateUser.userProfile.role === 'professor' || context.stateUser.userProfile.role === 'staff'){
      return(<UserNavigator/> )
    }
    else{
      return(<AdminNavigator/>)
    }
    
    
    
    
}
export default Main