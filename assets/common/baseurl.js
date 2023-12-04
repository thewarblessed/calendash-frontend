import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://192.168.100.103:8000/api/'
: baseURL = 'http://192.168.100.103:8000/api/'
}

export default baseURL;