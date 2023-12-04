import React, { useState, useCallback } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighLight,
    TouchableOpacity,
    Dimensions,
    Alert,
    Modal
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native"
import Button from "../../../components/Button";
import axios from "axios";
import baseURL from "../../../assets/common/baseurl";
import Toast from 'react-native-toast-message';

var { width } = Dimensions.get("window");

const ListVenue = ({ item, index, deleteProduct }) => {
    const imageURL = "http://192.168.100.103:8000/storage/"
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const image = `${imageURL}${item.image}`

    const [refreshing, setRefreshing] = useState(false);
    const createTwoButtonAlert = () =>{
    Alert.alert('Delete', 'Are you sure you want to delete this?', [
      {
        text: 'Yes',
        onPress: () => handleDelete(),
        style: 'cancel',
      },
      {text: 'No', onPress: () => console.log('No Pressed')},
    ]);
   }
   const handleDelete = () => {
    const id = item.id;
  
    axios.delete(`${baseURL}mobileAdmin/venue/delete/${id}`)
      .then((res) => {
        if (res && res.data) {
          console.log(res.data);
          
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Deleted Successfully",
            text2: "Venue has been deleted",
          });
          // onRefresh()
          // Navigate to VenueScreen after deletion
          setTimeout(() => {
            navigation.navigate("AdminDashboardScreen");
            navigation.navigate("AdminVenueScreen");
            // setRefreshing(false);
        }, 0.5);
          
        } else {
          console.error("Invalid response data:", res);
          Toast.show({
            position: 'bottom',
            bottomOffset: 20,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting venue:", error);
  
        Toast.show({
          position: 'bottom',
          bottomOffset: 20,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };
    return (
        <View>
            <View style={styles.box}>
            <Image style={styles.image} source={{ uri: `${image}` }} />
            <View style={styles.boxContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>Description: {item.description ? item.description : null}</Text>
              <Text style={styles.description}>Capacity: {item.capacity ? item.capacity : null}</Text>
              
              <View style={styles.buttons}>
                

                {/* <TouchableOpacity
                  style={[styles.button, styles.profile]}
                  onPress={showAlert}>
                  <Image
                    style={styles.icon}
                    source={{ uri: 'https://img.icons8.com/color/70/000000/cottage.png' }}
                  />
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={[styles.button, styles.message]}
                  onPress={() => [navigation.navigate("AdminChangeStatusScreen", { item }),]}>
                  <Image
                    style={styles.icon}
                    source={{ uri: 'https://img.icons8.com/ios-filled/50/create-new.png' }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.view]}
                  onPress={() => createTwoButtonAlert()}>
                  <Image
                    style={styles.icon}
                    source={{ uri: 'https://img.icons8.com/material/24/trash--v1.png' }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width,
        backgroundColor: 'black'
    },
    // image: {
    //     borderRadius: 50,
    //     width: width / 6,
    //     height: 20,
    //     margin: 2
    // },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    },


    
    image: {
        borderRadius: 30,
        width: 100,
        height: 100,
      },
      box: {
        padding: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#f4cdcd',
        flexDirection: 'row',
        borderRadius: 20
      },
      boxContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
      },
      title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#151515',
      },
      description: {
        fontSize: 15,
        color: '#646464',
      },
      buttons: {
        flexDirection: 'row',
      },
      button: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 50,
        marginRight: 5,
        marginTop: 5,
      },
      icon: {
        width: 20,
        height: 20,
      },
      view: {
        marginLeft: 5,
        backgroundColor: 'red',
      },
      profile: {
        backgroundColor: '#1E90FF',
      },
      message: {
        marginLeft: 90,
        backgroundColor: '#228B22',
      },
    
})


export default ListVenue