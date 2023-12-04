import React, { useContext, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Pressable, Alert } from 'react-native'
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import AuthGlobal from '../context/store/AuthGlobal';
import axios from "axios"
import baseURL from '../assets/common/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Swal from 'sweetalert2'
// import Swal from 'sweetalert2'
import TabNavigator from '../navigation/TabNavigator';
import { logoutUser } from "../context/actions/Auth.action"
import { LinearGradient } from 'expo-linear-gradient';

const UserProfile = () => {
    const [profiledata, setProfileData] = useState(null);
    const context = useContext(AuthGlobal)
    // const [userProfile, setUserProfile] = useState('')
    // const [orders, setOrders] = useState([])
    const navigation = useNavigation()
    
    // console.log(context.stateUser.isAuthenticated)

    const handleLogout = async () => {
      // Add logic for handling logout
      logoutUser(context.dispatch, navigation)
    };

    useFocusEffect(
      useCallback(() => {
        const checkAuthentication = async () => {
          const jwtToken = await AsyncStorage.getItem('jwt');
          // console.log(jwtToken)
          if (!jwtToken || !context.stateUser.isAuthenticated) {
            navigation.navigate('LoginScreen');
          } else {
            try {
              const userProfile = context.stateUser.userProfile;
              // console.log(userProfile)
              if (!userProfile || !userProfile.userId) {
                console.error("User profile or user ID is undefined");
                // Handle the error appropriately, e.g., navigate to an error screen.
                return;
              }

              const response = await axios.get(
                `${baseURL}profile/${userProfile.userId}`,
                {
                  headers: { Authorization: `Bearer ${jwtToken}` },
                }
              );
              const credentials = response.data.data
              // console.log(credentials)
              setProfileData(response.data);
            } catch (error) {
              console.error(error);
            }
          }
        };
        checkAuthentication();
        return () => {
          setProfileData(null);
        };

      }, [context.stateUser.isAuthenticated]))

      // console.log(userProfile)

      // console.log(profiledata)


  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "red", paddingTop: 10 }}>
      <LinearGradient
            style={{
                flex: 1,
                padding: 20
            }}
            colors={["white","#ffc8c8"]}
        >
          <Image
            source={{ uri: 'https://www.bootdey.com/image/900x400/FF7F50/000000' }}
            style={styles.coverImage}
          />
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}
              style={styles.avatar}
            />
            <Text style={[styles.name, styles.textWithShadow]}>{profiledata ? profiledata.credentials.name.toUpperCase() : ""}</Text>
          </View>
          <View style={{alignSelf: 'center', borderColor: 'black', borderStyle: 'solid',}}>
            <Pressable style={styles.boxWithBorder}
              onPress={() => handleLogout()}>
              <Text style={{
                  fontSize: 15,
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: 6
              }}>LOGOUT</Text>
            </Pressable>
            </View>
          <View style={styles.content}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{profiledata ? profiledata.credentials.email : ""}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Full Name:</Text>
              <Text style={styles.infoValue}>{profiledata ? profiledata.credentials.name : ""}</Text>
            </View>

            {profiledata && (profiledata.credentials.role === 'student' || profiledata.credentials.role === 'professor' || profiledata.credentials.role === 'staff') ? (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>TUP ID:</Text>
              <Text style={styles.infoValue}>{profiledata ? profiledata.data.tupID : ""}</Text>
            </View>
            ) : null}

            {/* YEAR AND SECTION */}
            {profiledata && profiledata.credentials.role === 'student' ? (
            <View style={{ flexDirection: 'row' }}>
                {/* First Column COURSE */}
                <View style={{ flex: 1, }}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Year Level:</Text>
                    <Text style={styles.infoValue}>{profiledata ? profiledata.data.yearlevel : ""} Year</Text>
                  </View>
                </View>

              {/* Second Column - YEAR */}
                  <View style={{ flex: 1 }}>
                    <View style={styles.infoContainer}>
                      <Text style={styles.infoLabel}>Section:</Text>
                      <Text style={styles.infoValue}>{profiledata ? profiledata.data.section : ""}</Text>
                  </View>
                  </View>
            </View>
            ) : null}

            {/* COURSE AND DEPT */}
            {profiledata && profiledata.credentials.role === 'student' ? (
            <View style={{ flexDirection: 'row' }}>
                      {/* First Column COURSE */}
                      <View style={{ flex: 1,  }}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.infoLabel}>Course:</Text>
                          <Text style={styles.infoValue}>{profiledata ? profiledata.data.course : ""}</Text>
                        </View>
                      </View>
                      {/* Second Column - YEAR */}
                          <View style={{ flex: 1 }}>
                            <View style={styles.infoContainer}>
                              <Text style={styles.infoLabel}>Department:</Text>
                              <Text style={styles.infoValue}>{profiledata ? profiledata.data.department : ""}</Text>
                            </View>
                          </View>
            </View>
            ) : null}

            {/* ORG AND ORG POSITION */}
            {profiledata && profiledata.credentials.role === 'student' ? (
            <View style={{ flexDirection: 'row' }}>
                      {/* First Column ORGANIZATION */}
                      <View style={{ flex: 1,  }}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.infoLabel}>Organization:</Text>
                          <Text style={styles.infoValue}>{profiledata ? profiledata.data.studOrg : ""}</Text>
                        </View>
                      </View>
                      {/* Second Column - ORG POSITION */}
                          <View style={{ flex: 1 }}>
                            <View style={styles.infoContainer}>
                              <Text style={styles.infoLabel}>Organization Position:</Text>
                              <Text style={styles.infoValue}>{profiledata ? profiledata.data.role.toUpperCase() : ""}</Text>
                            </View>
                          </View>
            </View>
            ) : null}

            {/* PROF ROLE: DEPT AND ORG */}
            {profiledata && profiledata.credentials.role === 'professor' ? (
            <View style={{ flexDirection: 'row' }}>
                      {/* First Column ORGANIZATION */}
                      <View style={{ flex: 1,  }}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.infoLabel}>Organization:</Text>
                          <Text style={styles.infoValue}>{profiledata ? profiledata.data.organization.toUpperCase() : ""}</Text>
                        </View>
                      </View>
                      {/* Second Column - DEPARTMENT */}
                          <View style={{ flex: 1 }}>
                            <View style={styles.infoContainer}>
                              <Text style={styles.infoLabel}>Department:</Text>
                              <Text style={styles.infoValue}>{profiledata ? profiledata.data.department.toUpperCase() : ""}</Text>
                            </View>
                          </View>
            </View>
            ) : null}


            {/* FOR STAFFS, DEPARTMENT ONLY */}
            {profiledata && profiledata.credentials.role === 'staff' ? (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Department:</Text>
              <Text style={styles.infoValue}>{profiledata ? profiledata.data.department : ""}</Text>
            </View>
            ) : null}

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Bio:</Text>
              <Text style={styles.infoValue}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</Text>
            </View>
          </View>
          </LinearGradient>
      </SafeAreaView>
    </ScrollView>  
  )
}

const styles = StyleSheet.create({
  boxWithBorder: {
    marginTop: 20,
    backgroundColor: 'black',
    width: 100,
    height: 40,
    borderWidth: 2, // Border width
    borderColor: 'blue', // Border color
    borderRadius: 20, // Border radius (for rounded corners)
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  coverImage: {
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color:'white'
  },
  content: {
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 18
  },
  infoValue: {
    marginTop: 5,
    fontSize: 15
  },
})

export default UserProfile