import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Toast from 'react-native-toast-message';
import baseURL from '../../../assets/common/baseurl';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker"

const VenueForm = (props) => {
    const imageURL = "http://192.168.100.103:8000/storage/"
    const [venueName, setVenueName] = useState('')
    const [venueDesc, setVenueDesc] = useState('')
    const [venueCapacity, setVenueCapacity] = useState('')
    const [image, setImage] = useState('');
    const [updateMainImage, setUpdateMainImage] = useState('');
    const [updateImage, setUpdateImage] = useState('');

    const [mainImage, setMainImage] = useState();
    // const [image, setImage] = useState('')
    const [item, setItem] = useState(null)
    // console.log(item)

    // console.log(props.route.params)
    useEffect(() => {
        if (!props.route.params) {
            setItem(null);
        }
        else {
            setItem(props.route.params.item);
            setImage(props.route.params.item.image);
            setVenueName(props.route.params.item.name);
            setVenueDesc(props.route.params.item.description);
            setVenueCapacity(props.route.params.item.capacity.toString());
        }
    }, [props.route.params])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            setMainImage(result.assets[0].uri);
            // const imgStr = result.assets[0].uri
            // const modifiedImgStr = imgStr.replace("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-022230f2-6992-42e8-9e54-c3f770818e9d/ImagePicker/", "") 
            setImage(result.assets[0].uri);
            // console.log(modifiedImgStr)
        }
    }

    const pickImageUpdate = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            setUpdateMainImage(result.assets[0].uri);
            // const imgStr = result.assets[0].uri
            // const modifiedImgStr = imgStr.replace("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-022230f2-6992-42e8-9e54-c3f770818e9d/ImagePicker/", "") 
            setUpdateImage(result.assets[0].uri);
            // const imgStr = result.assets[0].uri
            // const modifiedImgStr = imgStr.replace("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-022230f2-6992-42e8-9e54-c3f770818e9d/ImagePicker/", "") 
            // setImage(result.assets[0].uri);
            // console.log(modifiedImgStr)
        }
    }


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('venueName', venueName);
        formData.append('venueDesc', venueDesc);
        formData.append('venueCapacity', venueCapacity);
        formData.append('image', {
            uri: image,
            type: 'image/jpeg', // Adjust the type accordingly
            name: 'venue_image.jpg', // Adjust the filename accordingly
        });


        console.log(formData)
        axios.post(`${baseURL}mobileAdmin/venue/store`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Added Succesfully",
                        text2: "New Venude Added",
                    });
                    setTimeout(() => {
                        props.navigation.navigate("AdminVenueScreen");
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
    }

    const handleUpdate = () => {
        const id = props.route.params.item.id;
        // console.log(id)

        const formData = new FormData();
        formData.append('venueName', venueName);
        formData.append('venueDesc', venueDesc);
        formData.append('venueCapacity', venueCapacity);
        formData.append('image', {
            uri: updateImage,
            type: 'image/jpeg', // Adjust the type accordingly
            name: 'venue_image.jpg', // Adjust the filename accordingly
        });

        console.log(formData)
        
        // console.log(baseURL + 'admin/venue/store')
        axios.post(`${baseURL}mobileAdmin/venue/update/${id}`, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Updated Succesfully",
                        text2: "Venue Updated",
                    });
                    setTimeout(() => {
                        props.navigation.navigate("AdminVenueScreen");
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
                        {!props.route.params && !props.route.params ? (
                            <Text style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                marginVertical: 12,
                                color: 'black',
                                textAlign: 'center'
                            }}>
                                Create Venue
                            </Text>
                        ) : null}

                        {props.route.params && props.route.params ? (
                            <Text style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                marginVertical: 12,
                                color: 'black',
                                textAlign: 'center'
                            }}>
                                Update Venue
                            </Text>
                        ) : null}
                    </View>

                    {/* Venue Name */}

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Venue Name</Text>

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
                                placeholder='Enter venue name'
                                placeholderTextColor={COLORS.black}
                                name={"venueName"}
                                id={"venueName"}
                                value={venueName}
                                onChangeText={(text) => setVenueName(text)}
                                inputMode='text'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    {/* Description */}

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Description</Text>

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
                                placeholder='Enter description'
                                placeholderTextColor={COLORS.black}
                                name={"venueDesc"}
                                id={"venueDesc"}
                                value={venueDesc}
                                onChangeText={(text) => setVenueDesc(text)}
                                inputMode='text'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    {/* Capacity */}

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Capacity</Text>

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
                                placeholder='ex. 100'
                                placeholderTextColor={COLORS.black}
                                name={"venueCapacity"}
                                id={"venueCapacity"}
                                value={venueCapacity}
                                onChangeText={(text) => setVenueCapacity(text)}
                                inputMode='numeric'
                                style={{
                                    width: "78%"
                                }}
                            />
                        </View>
                    </View>

                    <View>
                        {!props.route.params ? (
                            // BUTTONS ADD
                            <>
                                <Text style={{ alignSelf: 'center', padding: 2, marginBottom: 15 }}>UPLOAD PHOTO ADD</Text>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image} source={{ uri: mainImage }} />
                                    <TouchableOpacity
                                        onPress={pickImage}
                                        style={styles.imagePicker}>
                                        <Ionicons name='camera' />
                                    </TouchableOpacity>
                                </View>
                                <Button
                                    onPress={() => handleSubmit()}
                                    title="ADD"
                                    filled
                                    style={{
                                        marginTop: 18,
                                        marginBottom: 4,
                                        backgroundColor: "black"
                                    }}
                                />
                            </>
                        ) : (
                            // BUTTONS UPDATE
                            <>
                                <Text style={{ alignSelf: 'center', padding: 2, marginBottom: 15 }}>UPLOAD PHOTO UPDATE</Text>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: updateImage ? updateImage : `${imageURL}${image}` }}
                                    />
                                    <TouchableOpacity
                                        onPress={pickImageUpdate}
                                        style={styles.imagePicker}>
                                        <Ionicons name='camera' />
                                    </TouchableOpacity>
                                </View>
                                <Button
                                    onPress={() => handleUpdate()}
                                    title="UPDATE"
                                    filled
                                    style={{
                                        marginTop: 18,
                                        marginBottom: 4,
                                        backgroundColor: "black"
                                    }}
                                />
                            </>
                        )}
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imageContainer: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 10,
        padding: 2,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "gray",
        padding: 8,
        borderRadius: 150,
        elevation: 20
    }
})

export default VenueForm

