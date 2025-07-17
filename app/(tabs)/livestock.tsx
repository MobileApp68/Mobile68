import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Header from '../components/Header';
import { router } from 'expo-router';

const livestock = () => {
  return (
    <View style={styles.container} >

      <Header />

      <ScrollView>
        <View style={styles.live} >
          <View style={styles.liveOne}>
            <FontAwesome name="calculator" size={24} color="black" />
            <View style={{paddingTop: 5, alignItems: 'center' }} >
              <Text>Start Live</Text>
              <Text>Session</Text>            
            </View>

          </View>

          <View style={styles.liveOne}>
            <FontAwesome name="newspaper-o" size={24} color="black" />
            <View style={{paddingTop: 5, alignItems: 'center' }} >
              <Text>Create Bulk</Text>
              <Text>Record</Text>            
            </View>
            
          </View>

        </View>

        <View style={styles.mainContent} >
          <TouchableOpacity onPress={ () => router.push('/screens/NewAnimal') } >
            <View style={styles.might}>
              <View  style= {styles.adjust}>
                <AntDesign name="tags" size={24} color="black"/>
                <Text>Individual Animals</Text>
              </View>
              <Entypo  name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => router.push('/screens/NewAnimal') }>
            <View style={styles.might}>
              <View style= {styles.adjust}>
                <MaterialCommunityIcons name="clipboard-list" size={24} color="black" />
                <Text>Record Templates</Text>       
              </View>   
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => router.push('/screens/NewAnimal') }>
            <View style={styles.might}>
              <View style= {styles.adjust}>
                <Ionicons name="brush-sharp" size={24} color="black" />
                <Text>Live Sessions</Text>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => router.push('/screens/NewAnimal') }>
            <View style={styles.might}>
              <View style= {styles.adjust}>
                <Entypo name="back-in-time" size={24} color="black" />
                <Text>Activity</Text> 
              </View> 
              <Entypo name="chevron-right" size={24} color="black" />         
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => router.push('/screens/NewAnimal') }>
            <View style={styles.might}>
              <View style= {styles.adjust}>
                <SimpleLineIcons name="basket-loaded" size={24} color="black" />
                <Text>Feed Plans</Text>  
              </View>
              <Entypo name="chevron-right" size={24} color="black" />        
            </View>
          </TouchableOpacity>
        </View>











      </ScrollView> 
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
    paddingBottom: 20,
  } ,
  liveOne: {
    borderWidth: 1,
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
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
    gap: 9

  }

})