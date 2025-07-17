import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';


const HeaderBack = () => {
  return (
    <View style={styles.header} >
        <View style={styles.three}  >
            <FontAwesome name="arrow-left" size={24} color="white" />
            <Text style= {{fontSize:20, fontWeight: 'bold', color: 'white'}} >AgriWebb</Text>
            <TouchableOpacity  >
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
  </View>
  )
}

export default HeaderBack

const styles = StyleSheet.create({
    header: {
        paddingTop:30,
        paddingHorizontal:10,
        backgroundColor: '#2D5A3D',
        height: 80,
        marginBottom: 20,
      },
      three:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
      },
})