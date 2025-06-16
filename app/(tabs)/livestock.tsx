import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const livestock = () => {
  return (
    <View style={styles.container} >

      <View style={styles.header} >
        <View style={styles.three}  >
          <AntDesign name="star" size={24} color="red" />
          <Text style= {{fontSize:20, fontWeight: 'bold'}} >LiveStock</Text>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
        </View>
      </View>

      <View style={styles.live} >
        <View style={styles.liveOne}></View>
        <View style={styles.liveTwo}></View>
      </View>

      <View style={styles.mainContent} >
        
      </View>












    </View>
  )
}

export default livestock

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  live: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 4,
    paddingBottom: 12
  } ,
  liveOne: {
    borderWidth: 1,
    flex: 1,
    height: 150
  },
  liveTwo: {
    borderWidth: 1,
    flex: 1,
    height: 150
  },
  header: {
    paddingTop:30,
    paddingHorizontal:10,
    backgroundColor: 'grey',
    height: 80,
    marginBottom: 20,
  },
  three:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  mainContent: {

  }

})