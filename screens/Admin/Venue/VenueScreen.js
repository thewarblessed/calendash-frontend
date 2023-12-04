import React, { useState, useContext, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  RefreshControl,
  SafeAreaView
} from 'react-native'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import AuthGlobal from '../../../context/store/AuthGlobal'
import { Ionicons } from "@expo/vector-icons";
import baseURL from '../../../assets/common/baseurl';
import axios from 'axios';
import ListVenue from './ListVenue';


var { height, width } = Dimensions.get("window")

const VenueScreen = () => {
  const imageURL = "http://192.168.100.103:8000/storage/"
  
  const [loading, setLoading] = useState(true);
  const [venueList, setVenueList] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      axios.get(`${baseURL}mobileAdmin/venue/index`)
        .then((res) => {
          // console.log(res.data)
          setLoading(true);
        })
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseURL}mobileAdmin/venue/index`);
          setVenueList(response.data);
          // console.log(response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
      return () => {
        setLoading(true);
      }
    }, [])
  );

  const context = useContext(AuthGlobal)
  // const data = [
  //   { id: 1, image: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
  //   { id: 2, image: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
  //   { id: 3, image: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
  //   { id: 4, image: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
  //   { id: 5, image: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
  //   { id: 6, image: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
  //   { id: 7, image: 'https://bootdey.com/img/Content/avatar/avatar7.png' },
  // ]

  // const [users, setUsers] = useState(data)
  const navigation = useNavigation()
  // showAlert = () => 

  const handleButton = () => {
    // Alert.alert('Alert', 'Naipressed')
    navigation.navigate('AdminVenueForm')
  }
  // console.log(fetchData)

  useFocusEffect(
    useCallback(() => {
      if (context.stateUser.userProfile.role === 'admin') {
        // console.log(context)
        // console.log(context.stateUser)
        navigation.navigate("AdminVenueScreen")
      }
    }, [context.stateUser.isAuthenticated])
  )


  return (
    <SafeAreaView style={{ flex: 1, padding: 10, marginTop: 10 }}>
      <View>
        {/* <Text>nice</Text> */}
        <FlatList
          data={venueList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          renderItem={({ item, index }) => (
            <ListVenue
              item={item}
              index={index}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, styles.buttonCall]}
        onPress={() => handleButton()}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/ios-filled/50/add--v1.png' }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    margin: 10,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    elevation: 4,
  },
  buttonCall: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#40E0D0',
  },
  icon: {
    width: 35,
    height: 35,
  },




  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro'
  },
  headerItem: {
    margin: 2,
    width: width / 6
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    marginBottom: 160,
    backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    marginLeft: 4,
    color: 'white'
  }
})

export default VenueScreen