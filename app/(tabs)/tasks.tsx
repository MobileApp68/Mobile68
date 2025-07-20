import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Header from '../components/Header';
import { router } from 'expo-router';



const tasks = () => {
  return (
    <View style={styles.container} >
      
      <Header/>

      <View style={styles.search} >
        <TextInput style={styles.filter} placeholder='Filter your Tasks' />
        <View>
          <FontAwesome name="toggle-on" size={24} color="black" />
        </View>
      </View>

      <View style = {styles.perfect}>
        <TouchableOpacity onPress={ ()=> router.push('/screens/NewTemplate') } style={styles.button} >
          <Text style={styles.buttonText}>Create New Template</Text>
        </TouchableOpacity>
      
      </View>




    </View>
  )
}

export default tasks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  filter: {
    borderWidth:1,
    height: 40,
    flex: 2
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap:5
  },
  button: {
    backgroundColor: '#2D5A3D',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  perfect : {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 20
  }

})