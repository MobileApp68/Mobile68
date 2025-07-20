import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const menu = () => {
  return (
    <View style = {styles.container} >
      <Header/>

      <ScrollView>
        <View style={styles.mainContent} >

          <View style={styles.might}>
            <View  style= {styles.adjust}>
              <MaterialCommunityIcons name="barn" size={24} color="#2D5A3D" />
              <Text>Farm</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />
          </View>

          <View style={styles.might}>
            <View style= {styles.adjust}>
              <FontAwesome5 name="calendar-check" size={24} color="#2D5A3D" />
              <Text>Calendar</Text>       
            </View>   
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />
          </View>

          <View style={styles.might}>
            <View style= {styles.adjust}>
              <MaterialIcons name="inventory" size={24} color="#2D5A3D" />
              <Text>Inventory</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />
          </View>

          <View style={styles.might}>
            <View style= {styles.adjust}>
              <FontAwesome5 name="truck" size={24} color="#2D5A3D" />
              <Text>Livestock Management</Text> 
            </View> 
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />         
          </View>

          <View style={styles.might}>
            <View style= {styles.adjust}>
              <FontAwesome5 name="cloud-rain" size={24} color="#2D5A3D" />
              <Text>Rainfall Records</Text>  
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />        
          </View>

          <View style={styles.might}>
            <View style= {styles.adjust}>
              <Ionicons name="settings-outline" size={24} color="#2D5A3D" />
              <Text>Settings</Text>  
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />        
          </View>

          <View style={styles.might}>
            <View style= {styles.adjust}>
              <FontAwesome name="bluetooth" size={24} color="#2D5A3D" />
              <Text>Hardware</Text>  
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />        
          </View>

          <View style={styles.might}>
            <View style= {styles.adjust}>
              <FontAwesome5 name="headset" size={24} color="#2D5A3D" />
              <Text>Support</Text>  
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />        
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default menu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F1'
  },
  mainContent: {
    gap: 10
  },
  might: {
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 9,
    paddingLeft: 9,
    paddingRight: 9
  },
  adjust: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center'
  
  }
})