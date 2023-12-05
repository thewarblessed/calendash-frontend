import React, { useState, useContext, useCallback } from 'react'
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView, Alert, Modal, Pressable } from 'react-native';
import Button from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import AuthGlobal from '../context/store/AuthGlobal';
import baseURL from '../assets/common/baseurl';
import axios from 'axios';

const propertyData = [
  {
    id: '1',
    image: 'https://source.unsplash.com/900x900/?house',
    price: '$250,000',
    address: '123 Main St',
    squareMeters: '150',
    beds: '3',
    baths: '2',
    parking: '1'
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/900x900/?apartment',
    price: '$400,000',
    address: '456 Oak Ave',
    squareMeters: '200',
    beds: '4',
    baths: '3',
    parking: '2'
  },
  {
    id: '3',
    image: 'https://source.unsplash.com/900x900/?house+front',
    price: '$150,000',
    address: '789 Maple Rd',
    squareMeters: '100',
    beds: '2',
    baths: '1',
    parking: '0'
  },
  {
    id: '4',
    image: 'https://source.unsplash.com/900x900/?small+house',
    price: '$150,000',
    address: '789 Maple Rd',
    squareMeters: '100',
    beds: '2',
    baths: '1',
    parking: '0'
  }
];



const Dashboard = ({item}) => {
  const context = useContext(AuthGlobal)
  const navigation = useNavigation()
  const [searchText, setSearchText] = useState('');
  const imageURL = "http://192.168.100.103:8000/storage/"
  const [venueData, setVenueData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseURL}mobileAdmin/venue/index`);
          setVenueData(response.data);
          // console.log(response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [])
  );

  const filteredData = venueData && venueData.filter((item) => {
    return item.capacity.toLowerCase().includes(searchText.toLowerCase());
  });
  function handleSearch(text) {
    setSearchText(text);
  }

  useFocusEffect(
    useCallback(() => {
      if (context.stateUser.userProfile.role === 'admin') {
        console.log(context)
        // console.log(context.stateUser)
        navigation.navigate("AdminVenueScreen")
      }
    }, [context.stateUser.isAuthenticated])
  )

  // const checkDate = () => {
    
  // }

  const checkDate = item => {
    // navigation.navigate(['EventForm', {item}])
    // [navigation.navigate("AdminVenueForm", { item }),]}
    // setModalVisible(true)
    // console.log(item)
    navigation.navigate("EventForm", { item })
  }

  const renderItem = ({ item }) => (
    <SafeAreaView>
      <TouchableOpacity >
        <Image source={{ uri: `${imageURL}${item.image}` }} style={styles.image} />
        <View style={styles.cardBody}>
          <Text style={styles.price}>{item.name}</Text>
          <Text style={styles.address}>Capacity: {item.capacity}</Text>
          <Text style={styles.address}>Description: {item.description}</Text>
          <TouchableOpacity>
            <Button
              onPress={() => checkDate(item)}
              title="Create Event"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </TouchableOpacity>
          {/* <Text style={styles.squareMeters}>{item.squareMeters} sq. m.</Text> */}

        </View>
        <View style={styles.cardFooter}>
          {/* <Text style={styles.beds}>{item.beds} beds</Text>
            <Text style={styles.baths}>{item.baths} baths</Text>
            <Text style={styles.parking}>{item.parking} parking</Text> */}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );



  return (
    <LinearGradient
      style={{
        flex: 1
      }}
      colors={["white", "#ffc8c8"]}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    paddingTop: 60,
  },
  searchInputContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  propertyListContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'dcdcdc',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardBody: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  address: {
    fontSize: 16,
    marginBottom: 5
  },
  squareMeters: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666'
  },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'black',
    justifyContent: 'space-between',
  },
  beds: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold'
  },
  baths: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold'
  },
  parking: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold'
  },

  ///// MODAL //////
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Dashboard