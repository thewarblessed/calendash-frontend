import { Platform } from 'react-native'


let imageURL = '';

{Platform.OS == 'android'
? baseURL = 'http://192.168.100.103:8000/storage/'
: baseURL = 'http://192.168.100.103:8000/storage/'
}

export default imageURL;