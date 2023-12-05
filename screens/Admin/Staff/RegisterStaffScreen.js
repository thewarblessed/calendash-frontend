import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../components/Button';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseurl';

const RegisterStudentScreen = (props) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isTextInputDisable] = useState(false);
    // const [selectedYear, setSelectedYear] = useState('');
    // const [selectedRole, setSelectedRole] = useState('');
    // const [openYear, setOpenYear] = useState(false);
    // const [valueYear, setValueYear] = useState(null);
    // const [year, setYear] = useState([
    //     {label: 'First Year', value: '1'},
    //     {label: 'Second Year', value: '2'},
    //     {label: 'Third Year', value: '3'},
    //     {label: 'Fourth Year', value: '4'}
    // ]);
    // const [openRole, setOpenRole] = useState(false);
    // const [valueRole, setValueRole] = useState(null);
    // const [role, setRole] = useState([
    //     {label: 'Member', value: 'member'},
    //     {label: 'Executive', value: 'executive'}
    // ]);

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [tupId, setTupId] = useState('')
    // const [course, setCourse] = useState('')
    // const [yearLevel, setSelectedYear] = useState('')
    const [dept, setDept] = useState('')
    // const [organization, setOrganization] = useState('')
    // const [section, setSection] = useState('')
    const [orgRole, setSelectedRole] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        const user = {
            role: "Staff",
            firstname,
            lastname,
            tupId,
            dept,
            orgRole,    
            email,
            password,
        };
        console.log(user)
        axios.post(`${baseURL}auth/sign-up`, user)
            .then((res) => {
              if (res.status == 200) {
                console.log(res)
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Registration Succeeded",
                  text2: "Please Login into your account",
                });
                setTimeout(() => {
                  props.navigation.navigate("LoginScreen");
                }, 500);
              }
            })
            .catch((error) => {
                console.log(error.response.data)
              Toast.show({
                position: 'bottom',
                bottomOffset: 20,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
              });
            });
        console.log(user)
      }
    
    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={100}
            enableOnAndroid={true}
            >
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create an Account
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Connect with your friend today!</Text>
                </View>

                {/* FIRST NAME */}
                
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>First Name</Text>

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
                            placeholder='Enter your first name'
                            placeholderTextColor={COLORS.black}
                            name={"firstname"}
                            id={"firstname"}
                            value={firstname}
                            onChangeText={(text) => setFirstname(text)}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                {/* LAST NAME */}

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Last Name</Text>

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
                            placeholder='Enter your last name'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            name={"lastname"}
                            id={"lastname"}
                            value={lastname}
                            onChangeText={(text) => setLastname(text)}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                {/* TUP ID */}

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>TUP-T ID</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 20
                    }}>
                        <TextInput
                            placeholder='TUPT-'
                            placeholderTextColor={COLORS.black}
                            editable={isTextInputDisable}
                            style={{
                                width: "19%",
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: "100%"
                            }}
                        />

                        <TextInput
                            placeholder='XX-XXXX'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            name={"tupId"}
                            id={"tupId"}
                            value={tupId}
                            onChangeText={(text) => setTupId(text)}
                            style={{
                                width: "78%"
                            }}
                        />
                    </View>
                </View>

                {/* DEPT & ORG */}
                
                <View style={{ flex: 1 }}>
                        <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                        }}>Department</Text>

                        <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                        }}>
                        <TextInput
                            placeholder='ex. EAAD'
                            placeholderTextColor='grey'
                            keyboardType='email-address'
                            name={"dept"}
                            id={"dept"}
                            value={dept}
                            onChangeText={(text) => setDept(text)}
                            style={{
                            width: "100%"
                            }}
                        />
                        </View>
                    </View>

                {/* ROLE */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>ROLE</Text>
                        <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, }}>
                                <Picker
                                    selectedValue={orgRole}
                                    onValueChange={(itemValue) => setSelectedRole(itemValue)}
                                    >
                                    <Picker.Item label="Select Role" value="" />    
                                    <Picker.Item label="Member" value="member" />
                                    <Picker.Item label="Executive" value="executive" />
                                </Picker>
                            </View>    
                </View>

                    {/* email */}
                <View style={{ marginBottom: 12 }}>
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
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                {/* PASSWORD */}
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
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            name={"password"}
                            id={"password"}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
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

                    <Text>I aggree to the terms and conditions</Text>
                </View> */}

                <Button
                    onPress={() => handleSubmit()}
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                        backgroundColor: "red"
                    }}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

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
                            source={require("../assets/images/facebook.png")}
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
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default RegisterStudentScreen