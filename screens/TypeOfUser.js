import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import COLORS from '../constants/colors';
import Button from '../components/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from "@react-navigation/native"

const TypeOfUser = (props) => {
const navigation = useNavigation()
  return (
    <LinearGradient
            style={{
                flex: 1
            }}
            colors={["white","#FA0505"]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../assets/images/Megaphone.png")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/images/LotusBalloon.png")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/images/WODay.png")}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/images/TimeManagement.png")}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>

                {/* content  */}
                {/* <View style={{
                    flex: 1,
                    backgroundColor: "gray",
                }}> */}
                    <View style={{
                        paddingHorizontal: 22,
                        position: "absolute",
                        top: 350,
                        width: "100%"
                    }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: 400,
                            color: "black",
                            textAlign: 'center',
                        }}>SELECT TYPE OF USER</Text>

                        <View style={{ flexDirection: 'row', marginBottom: 12, top: 10}}>
                        {/* First Column COURSE */}
                            <View style={{ flex: 1, marginRight: 12, }}>
                                <Text style={{
                                fontSize: 14,
                                fontWeight: 700,
                                marginVertical: 8,
                                textAlign: "center"
                                }}>STUDENT</Text>

                                <TouchableOpacity
                                onPress={() => props.navigation.navigate("RegisterStudentScreen")} 
                                style={{
                                    flex: 1,
                                    backgroundColor: 'white', // Border color
                                    borderRadius: 10, // Border radius for rounded corners (optional)
                                    padding: 10,
                                }}
                                    >
                                    <Image
                                        source={require("../assets/images/student.png")}
                                        style={{
                                            alignSelf: "center",
                                            height: 100,
                                            width: 100,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            
                        {/* Second Column - YEAR */}
                        <View style={{ flex: 1, marginRight: 12 }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 700,
                                marginVertical: 8,
                                textAlign: "center"
                                }}>PROFESSOR</Text>

                                <TouchableOpacity
                                onPress={() => navigation.navigate("RegisterProfScreen")} 
                                style={{
                                    flex: 1, 
                                    backgroundColor: 'white', // Border color
                                    borderRadius: 10, // Border radius for rounded corners (optional)
                                    padding: 10,
                                    
                                }}
                                >
                                    
                                    <Image
                                        source={require("../assets/images/prof.png")}
                                        style={{
                                            alignSelf: 'center',
                                            height: 100,
                                            width: 100,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>

                        {/* Third Column - YEAR */}
                        <View style={{ flex: 1, marginRight: 12 }}>
                                <Text style={{
                                fontSize: 14,
                                fontWeight: 700,
                                marginVertical: 8,
                                textAlign: "center"
                                }}>ADMIN/STAFF</Text>

                                <TouchableOpacity 
                                    onPress={() => navigation.navigate("RegisterStaffScreen")}
                                    style={{
                                    flex: 1, 
                                    backgroundColor: 'white', // Border color
                                    borderRadius: 10, // Border radius for rounded corners (optional)
                                    padding: 10,
                                }}
                                    >
                                    <Image
                                        source={require("../assets/images/Staff.png")}
                                        style={{
                                            alignSelf: 'center',
                                            height: 100,
                                            width: 100,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                    </View>

                        <View style={{
                            flexDirection: "row",
                            marginTop: 12,
                            justifyContent: "center",
                            top: 120
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white
                            }}>Already have an account ?</Text>
                            <Pressable
                                onPress={() => navigation.navigate("LoginScreen")}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.white,
                                    fontWeight: "bold",
                                    marginLeft: 4
                                }}>Login</Text>
                            </Pressable>

                        </View>
                    </View>
                {/* </View> */}
            </View>
    </LinearGradient>
  )
}

export default TypeOfUser