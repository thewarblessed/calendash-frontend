import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import createBottomTabNavigator from '@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator';
import { Ionicons } from '@expo/vector-icons';

//ADMIN SCREENS
import VenueForm from "../screens/Admin/Venue/VenueForm"
import AdminDashboard from "../screens/Admin/AdminDashboard"
import UserProfile from '../screens/UserProfile';
import VenueScreen from "../screens/Admin/Venue/VenueScreen";
import VenueDetailScreen from "../screens/Admin/Venue/VenueDetailScreen";

import NewScreen from "../screens/Admin/Venue/NewScreen";

import EventScreen from "../screens/Admin/Event/EventScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
    return(
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle: {backgroundColor: '#fccccc'},
        activeTintColor: '#16247d', // Color of the active tab
        inactiveTintColor: '#111', // Color of the inactive tabs
        labelStyle: {
          fontSize: 12, // Font size of the tab labels
        },
        style: {
          // Background color of the tab bar
          
        },
      }}>
        <Tab.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{
            tabBarLabel: 'DASHBOARDS',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="apps"
                size={24}
                color={focused ? '#16247d' : '#111'}
              />
            ),
            headerTitle: 'Dashboard',
          }}
        />
        {/* <Tab.Screen
          name="AdminVenue"
          component={VenueScreen}
          options={{
            tabBarLabel: 'VENUES',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="location-sharp"
                size={24}
                color={focused ? '#16247d' : '#111'}
              />
            ),
            headerTitle: 'Available Venues',
          }}
        /> */}
        <Tab.Screen
          name="AdminNewScreen"
          component={NewScreen}
          options={{
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-circle"
                size={24}
                color={focused ? '#16247d' : '#111'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Admin Profile"
          component={UserProfile}
          options={{
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-circle"
                size={24}
                color={focused ? '#16247d' : '#111'}
              />
            ),
          }}
        />
        {/* Add more tab screens if needed */}
      </Tab.Navigator>
    )
  }

export const AdminNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="AdminDashboardScreen"
                component={AdminTabNavigator}
                options={{
                    headerShown:false
                }}
                />
                <Stack.Screen 
                name="AdminVenueDetail"
                component={VenueDetailScreen}
                options={{
                    headerShown:false
                }}
                />
                <Stack.Screen
                name="AdminVenueScreen"
                component={VenueScreen}
                options={{
                    headerTitle:"Venues"
                }}
                />
                <Stack.Screen
                name="AdminVenueForm"
                component={VenueForm}
                options={{
                    headerShown:false
                }}
                />
                <Stack.Screen 
                name="AdminEventScreen"
                component={EventScreen}
                options={{
                    headerShown:false
                }}
                />
        </Stack.Navigator>
    )
}
