import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseurl"
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
// import axios from '../../axios'
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// export const loginUser = async(user, dispatch) => {
//     const [error, setError] = useState('')
//     const navigation = useNavigation()
//     console.log(user)
//     const response = await fetch(`${baseURL}auth/sign-in`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ user }),
//     })
//     const data = await response.json();
//     console.log(data)

//     if (data.status === 200) {
//         AsyncStorage.setItem('userData', JSON.stringify(data.user));
//         context.dispatch({ type: 'LOGIN', payload: data.user });
//         navigation.navigate("UserProfile");
//     } else {
//         setError(data.errors,"Login failed");
//     }
// };

export const loginUser = async (email, password, navigation, dispatch) => {
  // const dispatch = useDispatch();
    try {
      const response = await fetch(`${baseURL}auth/sign-in`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();
      // console.log(data);
      // const user = {
      //   email: data.user.email,
      //   password: data.user.password,
      //   userId: data.user.id
      // };
      // console.log(user)
      if (data.status === 200) {
        const token = data.token;
        
        // Save the token in AsyncStorage
        await AsyncStorage.setItem('jwt', token);
        // console.log(token);
        // Decode the token
        const decoded = jwt_decode(token);
        // console.log(decoded)
        // Assuming user role is available in data.user.role
        const user = {
          email: data.user.email,
          password: data.user.password,
          userId: data.user.id,
          role: data.user.role
        };

        dispatch(setCurrentUser(decoded, user));

        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Logged In Successfully',
          text2: 'Welcome!',
        });
        ////////// NAVIGATE TO SPECIFIC ROLE
        if (user.role === 'student' || user.role === 'professor' || user.role === 'staff')  {
          navigation.navigate('UserProfile');
        } else{
          console.log('navigator to Admin')
          navigation.navigate('AdminDashboardScreen');
        }

      } else {
        // Handle login failure
        throw new Error(data.errors);
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error('Invalid credentials:', error);
      Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
        text2: 'Please check your credentials and try again.',
      });
    }
  };

export const login = (email, password, dispatch) => {
    
    const url = `${baseURL}admin/indexVenues`;

    axios.get(url)
        .then(response => {
            console.log('Axios request successful:', response.data);
        })
        .catch(error => {
            console.error('Error with Axios request:', error);

            // Log specific details of the error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
            }
        });
}

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch, navigation) => {
  try {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}));
    Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Logged Out Successfully',
        text2: 'Goodbye!',
    });
    // Navigate to the Login screen
    // navigation.navigate('Login');
} catch (error) {
    console.error('Logout failed:', error);
    Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: 'An error occurred while logging out. Please try again.',
    });
}
}

export const setCurrentUser = (decoded, user) => {
    // console.log(user)
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}