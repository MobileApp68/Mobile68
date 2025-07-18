import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';

const NewAnimal = () => {
  return (
    <View style = {styles.container}>

      <View style ={styles.block} >
        <TouchableOpacity onPress={ ()=> router.push('/screens/AddAnimal') } >
          <Entypo name="circle-with-plus" size={32} color="#2D5A3D" />
        </TouchableOpacity>
        <Text>Add A New Animal</Text>
      </View>
    </View>
  )
}

export default NewAnimal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F1'
  },
  block: {
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
    paddingLeft: 10,
    gap: 15,
  }
})