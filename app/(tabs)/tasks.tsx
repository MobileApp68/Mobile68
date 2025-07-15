import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Header from '../components/Header';



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
  }

})