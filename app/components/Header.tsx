import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';


const Header = () => {
  return (
    <View style={styles.header} >
        <View style={styles.three}  >
            <AntDesign name="star" size={24} color="red" />
            <Text style= {{fontSize:20, fontWeight: 'bold'}} >AgriWebb</Text>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
        </View>
  </View>
  )
}

export default Header

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