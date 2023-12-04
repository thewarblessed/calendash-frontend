import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import COLORS from '../constants/colors';
import Button from '../components/Button';

const WelcomeScreen = ({navigation}) => {
  return (
    <LinearGradient
            style={{
                flex: 1
            }}
            colors={["#970C10","black"]}
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

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 340,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 900,
                        color: "white",
                        textAlign: 'center',
                    }}>Welcome to</Text>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 900,
                        color: "#C8DF52",
                        textAlign: 'center',
                    }}>CALENDASH</Text>

                    <View style={{
                        height: 30
                    }} />

                    <View style={{ marginVertical: 22}}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4
                        }}>Make your events better by planning them just right..</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}>Forge connections effortlessly by organizing events through efficient scheduling.</Text>
                    </View>

                    <Button
                        title="Start"
                        onPress={() => navigation.navigate("TypeOfUser")}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
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
            </View>
    </LinearGradient>
  )
}

export default WelcomeScreen;