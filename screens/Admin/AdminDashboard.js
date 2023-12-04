import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, FlatList } from 'react-native'

const AdminDashboard = () => {
    const navigation = useNavigation();
    const data = [
        { id: 1, title: 'Venues', image: 'https://img.icons8.com/3d-fluency/94/point-objects.png' },
        { id: 2, title: 'Events', image: 'https://img.icons8.com/3d-fluency/94/confetti.png' },
        { id: 3, title: 'Others', image: 'https://img.icons8.com/3d-fluency/94/more--v2.png' }
      ]
      const [options, setOptions] = useState(data)
//   console.log(options)

  const showAlert = item => {
    // Alert.alert('Option selected' + item.id)
    if (item.id === 1){
      navigation.navigate('AdminVenueScreen');
    }
    else{
      navigation.navigate('AdminEventScreen');
    }
    
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={options}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                showAlert(item)
              }}>
              <View style={styles.cardFooter}></View>
              <Image style={styles.cardImage} source={{ uri: item.image }} />
              <View style={styles.cardHeader}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#ff5f5f',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    borderRadius: 25,
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 18,
    marginVertical: 10,
    backgroundColor: '#dc9797',
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: 'white',
  },
})

export default AdminDashboard