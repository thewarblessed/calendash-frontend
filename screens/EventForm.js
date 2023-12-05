import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useState, useCallback } from 'react';
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import baseURL from '../assets/common/baseurl';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from '@react-native-picker/picker';
// import { useContext } from 'react';
import AuthGlobal from '../context/store/AuthGlobal';
import DateTimePicker from '@react-native-community/datetimepicker';

const EventForm = (props) => {

    
    
    const imageURL = "http://192.168.100.103:8000/storage/";
    // console.log(props.route.params)
    const venue = props.route.params;

    const navigation = useNavigation()
    // user id
    const [eventname, setEventName] = useState('')
    const [venue_id, setVenue] = useState('')
    const [description, setDescription] = useState('')
    // const [date, setDate] = useState('')
    const [participants, setParticipants] = useState('')
    const [target_dept, setTargetDept] = useState('')

    const context = useContext(AuthGlobal)

    console.log(context.stateUser.userProfile.userId)
    const user_id = context.stateUser.userProfile.userId

    // const formatDateForDatabase = (date) => {
    //     const formattedDate = date.toISOString().split('T')[0];
    //     return formattedDate;
    // };
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());

    const showDatePicker = () => {
        setShow(true);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const formatDateForDatabase = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    };
    const handleSubmit = () => {
        const event = {
            user_id,
            eventname,
            venue_id: props.route.params.item.id,
            description,
            date: formatDateForDatabase(date),
            participants,
            target_dept
        };
        console.log(event)

        axios.post(`${baseURL}mobileAdmin/event/store`, event)
            .then((res) => {
              if (res.status == 200) {
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Event Scheduled Succesfully",
                  text2: "We'll check for your request",
                });
                setTimeout(() => {
                  props.navigation.navigate("Dashboard");
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
        // console.log(user)
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
                            alignSelf:'center',
                            fontWeight: 'bold',
                            marginVertical: 12,
                            color: COLORS.black
                        }}>
                            Create an Event
                        </Text>
                    </View>

                    <Image source={{ uri: `${imageURL}${venue.item.image}` }} style={styles.image} />

                    {/* FIRST NAME */}

                    <View style={{ marginVertical: 1 }}>
                        <Text style={{
                            fontSize: 18,
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            marginVertical: 12,
                            color: COLORS.black
                        }}>
                            Chosen Venue: {venue.item.name}
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            color: COLORS.black,
                            marginBottom: 20
                        }}>
                            Max. no. of participants: {venue.item.capacity}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Event Name</Text>

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
                                placeholder='Enter event name'
                                placeholderTextColor={COLORS.black}
                                name={"eventname"}
                                id={"eventname"}
                                value={eventname}
                                onChangeText={(text) => setEventName(text)}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    {/* Event Description */}

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Event Description</Text>

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
                                placeholder='Enter event description'
                                placeholderTextColor={COLORS.black}
                                keyboardType='text'
                                name={"description"}
                                id={"description"}
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    {/* participants */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>No. of Participants</Text>

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
                                placeholder='Enter no. of participants'
                                placeholderTextColor={COLORS.black}
                                keyboardType='numeric'
                                name={"participants"}
                                id={"participants"}
                                value={participants}
                                onChangeText={(text) => setParticipants(text)}
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
                                selectedValue={target_dept}
                                onValueChange={(itemValue) => setTargetDept(itemValue)}
                            >
                                <Picker.Item label="Target Participants" value="" />
                                <Picker.Item label="EAAD" value="EAAD" />
                                <Picker.Item label="CAAD" value="CAAD" />
                                <Picker.Item label="MAAD" value="MAAD" />
                                <Picker.Item label="BASD" value="BASD" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            marginVertical: 8
                        }}>Date of Event</Text>

                        <TouchableOpacity
                            onPress={showDatePicker}
                            style={{
                                width: '100%',
                                height: 48,
                                borderColor: 'black',
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: 'right',
                                justifyContent: 'center',
                                paddingLeft: 22,
                            }}
                        >
                            <Text style={{ color: 'black' }}>
                                {formatDateForDatabase(date)} {/* Display the selected date */}
                            </Text>
                        </TouchableOpacity>

                        {show && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <Button
                        onPress={() => handleSubmit()}
                        title="Create"
                        filled
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                            backgroundColor: "red"
                        }}
                    />

                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        marginBottom: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      },
})

export default EventForm