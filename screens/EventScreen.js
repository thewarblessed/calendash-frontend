import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, {useCallback, useState}from 'react'
import { useFocusEffect } from "@react-navigation/native"
import axios from 'axios';
import baseURL from '../assets/common/baseurl';

const posts = [
  {
    id: 1,
    title: 'Post 1',
    image: 'https://www.bootdey.com/image/280x280/7B68EE/000000',
    author: 'Jane Doe',
    date: 'January 1, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.',
  },
  {
    id: 2,
    title: 'Post 2',
    image: 'https://www.bootdey.com/image/280x280/7B68EE/000000',
    author: 'John Doe',
    date: 'January 2, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.',
  },
];

const EventScreen = () => {
  const [eventData, setEventData] = useState(null);
  const navigation = useNavigation();
  
  const handleButton = () => {
    navigation.navigate('Dashboard')
    // Alert.alert('button pressed')
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseURL}mobileAdmin/event/index`);
          setEventData(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
      {eventData && eventData.map(post => (
        <TouchableOpacity key={post.id} style={styles.post}>
          <Image source={{ uri: 'https://source.unsplash.com/900x900/?house' }} style={styles.postImage} />
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>{post.eventName}</Text>
            <Text style={styles.postMeta}>
              Description: {post.description} | {post.date}
            </Text>
            <Text style={styles.postExcerpt}>Participants: {post.target_dept}</Text>
            <Text style={styles.postExcerpt}>Date: {post.event_date}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    <TouchableOpacity
          style={[styles.button, styles.buttonCall]}
          onPress={() => handleButton()}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://img.icons8.com/3d-fluency/94/add.png' }}
          />
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 70,
  },
  container: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
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
    backgroundColor: '#40E0D0',
  },
  post: {
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 25,
  },
  postContent: {
    padding: 20,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postMeta: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  postExcerpt: {
    fontSize: 14,
  },
});
export default EventScreen
