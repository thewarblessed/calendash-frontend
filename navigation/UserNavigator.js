import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { WelcomeScreen, RegisterScreen, LoginScreen, TypeOfUser } from '../screens';
import RegisterStudentScreen from '../screens/Student/RegisterScreen';
import RegisterProfScreen from '../screens/Prof/RegisterProfScreen';
import RegisterStaffScreen from '../screens/Staff/RegisterStaffScreen';
import UserProfile from '../screens/UserProfile';
import Dashboard from '../screens/Dashboard';
import Carousel from '../screens/Carousel';
import createBottomTabNavigator from '@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator';
import { Ionicons } from '@expo/vector-icons';
import EventScreen from '../screens/EventScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import EventForm from '../screens/EventForm';
import NewScreen from '../screens/NewScreen';
//ADMIN



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export const UserProfileTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
      activeTintColor: '#16247d', // Color of the active tab
      inactiveTintColor: '#111', // Color of the inactive tabs
      labelStyle: {
        fontSize: 12, // Font size of the tab labels
      },
      style: {
        backgroundColor: '#fff', // Background color of the tab bar
      },
    }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle:"Available Venues",
          tabBarLabel: 'Venues',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="location"
              size={24}
              color={focused ? '#16247d' : '#111'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          headerTitle:"Events",
          tabBarLabel: 'Events',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="party-popper" size={28} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Carousel"
        component={Carousel}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={24}
              color={focused ? '#16247d' : '#111'}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="My Profile"
        component={UserProfile}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? '#16247d' : '#111'}
            />
          ),
        }}
      />
      {/* Add more tab screens if needed */}
    </Tab.Navigator>
  );
};

export default UserNavigator = () =>{
  return (
    <Stack.Navigator
    initialRouteName="WelcomeScreen">
        {/* UserNavigator */}
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="NewScreen"
          component={NewScreen}
          options={{
            headerShown:false
          }}
        />
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
        <Stack.Screen
          name="EventForm"
          component={EventForm}
          options={{
            headerShown:false
          }}
        />
    </Stack.Navigator>
  )
}
