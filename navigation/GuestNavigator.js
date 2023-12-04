import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { WelcomeScreen, RegisterScreen, LoginScreen, TypeOfUser } from '../screens';
import RegisterStudentScreen from '../screens/Student/RegisterScreen';
import RegisterProfScreen from '../screens/Prof/RegisterProfScreen';
import RegisterStaffScreen from '../screens/Staff/RegisterStaffScreen';
import UserProfile from '../screens/UserProfile';
import { UserProfileTabNavigator } from './UserNavigator';

const Stack = createStackNavigator();
const GuestNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName="WelcomeScreen">
        {/* GuestNavigator */}
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown:false
          }}
        />
        {/* MAY BOTTOM TAB NA DAPAT */}
        <Stack.Screen
          name="UserProfile"
          component={UserProfileTabNavigator}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="TypeOfUser"
          component={TypeOfUser}
          options={{
            headerShown:false
          }}
        />

         <Stack.Screen
        name="RegisterStudentScreen"
          component={RegisterStudentScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
        name="RegisterProfScreen"
          component={RegisterProfScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
        name="RegisterStaffScreen"
          component={RegisterStaffScreen}
          options={{
            headerShown:false
          }}
        />
    </Stack.Navigator>
  )
}

export default GuestNavigator