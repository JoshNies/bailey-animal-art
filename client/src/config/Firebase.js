import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyAewbVZhTZK3P1te40a8BailLIOAhGr0jc",
  authDomain: "bailey-animal-art-baa.firebaseapp.com",
  databaseURL: "https://bailey-animal-art-baa.firebaseio.com",
  projectId: "bailey-animal-art-baa",
  storageBucket: "bailey-animal-art-baa.appspot.com",
  messagingSenderId: "86625660686",
  appId: "1:86625660686:web:6e33511853e9be16"
}

const Fire = firebase.initializeApp(config)
export default Fire
