import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import AuthGlobal from '../context/store/AuthGlobal'
import { loginUser } from '../context/actions/Auth.action'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Error from '../Shared/Error';
import {LinearGradient} from 'expo-linear-gradient'
import { login } from '../context/actions/Auth.action';
import { useDispatch } from 'react-redux';

import axios from 'axios';

const LoginScreen = (props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigation = useNavigation()
  const context = useContext(AuthGlobal)

//   useFocusEffect(() => {
//     if (context.stateUser.isAuthenticated === true) {
//       navigation.navigate("UserProfile")
//     }
//   }, [context.stateUser.isAuthenticated])
  useFocusEffect(
    useCallback(() => {
        if (context.stateUser.isAuthenticated === true) {
          // console.log(context)
            // console.log(context.stateUser)
            navigation.navigate("UserProfile")
        }
        else
        {
            setEmail('')
            setPassword('')
        }
    }, [context.stateUser.isAuthenticated, navigation, setEmail, setPassword])
  )
  const handleSubmit = () => {

    if (email === "" || password === "") {
      setError("Please fill in your credentials");

    } else {
        loginUser(email,password,navigation, context.dispatch);
    //   console.log("error")
    }
    // console.log(user)
  }
  return (
    <LinearGradient
            style={{
                flex: 1
            }}
            colors={["white","#ffc8c8"]}
        >
            <View style={{ flex: 1, marginHorizontal: 30, marginTop: 150 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!</Text>
                </View>

                <View style={{ marginBottom: 12, }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            name={"email"}
                            id={"email"}
                            value={email}
                            onChangeText={(text) => setEmail(text.toLowerCase())}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            name={"password"}
                            id={"password"}
                            value={password}
                            onChangeText={(text) => setPassword(text.toLowerCase())}
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == false ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Remenber Me</Text>
                </View> */}
                <TouchableOpacity >
                {/* {error ? <Error message={error} /> : null} */}
                    <Button
                        onPress={() => handleSubmit()}
                        title="Login"
                        filled
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                            backgroundColor: "red"
                        }}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => handleSubmit()}>
                        <Text>LOGIN</Text>
                </TouchableOpacity> */}

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View> */}

                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View> */}

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("TypeOfUser")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>
            </View>
    </LinearGradient>
  )
}

export default LoginScreen