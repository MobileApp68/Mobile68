import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Header from '../components/Header';
import { router,  } from 'expo-router';
import { useState } from 'react';

    const [animalCounts, setAnimalCounts] = useState({
    bulls: 0,
    cattle: 0,
    rams: 0,
    sheep: 0
});


export default function App() {
  return (<>
    <SafeAreaView style={styles.safeContainer} >


      <View style={styles.container} >
        

        <Header/>

        <ScrollView>
        <View style={styles.mainContent} >


          <View style={styles.farms} >
            <MaterialCommunityIcons name="barn" size={24} color="#2D5A3D" />
            <View >
              <Text style={{fontWeight: 'bold', fontSize: 20, color: '#2D5A3D'}} >Marigold Farms</Text>
              <Text style={{fontSize: 20, opacity:500}}>Sunday 25th May 2025</Text>
            </View>
          </View>


          <View style={styles.details} >
            <Text >Individual Animals</Text>
            <TouchableOpacity onPress={ ()=> router.push('/screens/MoreDetails') } >
              <Text>More Details</Text>
            </TouchableOpacity>
          </View>        

          <View style={styles.animalSection} >
            <View style={styles.boxOne} >
              <Text>Bulls</Text>
              <Text>{animalCounts.bulls}</Text>
            </View>
            <View style={styles.boxTwo} >
              <Text>Cattle</Text>
              <Text>{animalCounts.cattle}</Text>
            </View>
            <View style={styles.boxThree} >
              <Text>Rams</Text>
              <Text>{animalCounts.rams}</Text>
            </View>
            <View style={styles.boxFour} >
              <Text>Sheep</Text>
              <Text>{animalCounts.sheep}</Text>
            </View>
          </View>

          <View style={styles.rainfall} >
            <Text>Rainfall</Text>
            <Text>Go to Records</Text>
          </View>

          <View style={styles.ytd} >
            <View style={styles.ytdBox} >
              <View style={styles.ytdOne}>
                <Text>Total Ytd</Text>
                <Text>~</Text>
              </View>
              <View style={styles.ytdOne}>
                <Text>Wet Days Ytd</Text>
                <Text>0</Text>              
              </View>            
            </View>
            <Entypo name="circle-with-plus" size={50} color="#2D5A3D" />
          </View>

          <View style={styles.tasks} >
            <Text>Upcoming Tasks</Text>
            <Text>Go To Tasks</Text>
          </View>

          <View style={styles.active} > 
            <View style={styles.jobs} >
              <Text style={{flex:1, textAlign: 'center', margin: 'auto'}} >My Jobs</Text>
              <View style={styles.ac}>
                <Text style={{margin: 'auto'}} >All Active</Text>
              </View>
            </View>
            <Entypo name="circle-with-plus" size={50} color="#2D5A3D" />
          </View>



        </View>


        </ScrollView>
      </View>
    </SafeAreaView>
    </> )

}



const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#2D5A3D'
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F1F1'
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  farms: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  }, 
  coral: {
    height:50,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mainContent: {

  },
  animalSection: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 1.5,
    paddingBottom: 20,
  },
  boxOne: {
    backgroundColor: 'white',
    flex: 1,
    height: 70,
    borderWidth:1,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7, 
    padding: 9,
  },
  boxTwo: {
    backgroundColor: 'white',
    flex: 1,
    height: 70,
    borderWidth:1, 
    padding: 9,   
  },  
  boxThree: {
    backgroundColor: 'white',
    flex:1,
    height: 70,
    borderWidth:1, 
    padding: 9,   
  },
  boxFour: {
    backgroundColor: 'white',
    flex:1,
    height: 70,
    borderWidth:1,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,  
    padding: 9,  
  },
  rainfall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom:10,
  },
  ytd: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 1.5,
    paddingBottom: 20,
    alignItems: 'center'
  },
  ytdOne: {
    borderWidth:1,
    flex:1,
    height:100,
    gap: 10,
    padding: 9,
  },
  ytdBox: {
    flex:1,
    flexDirection:'row',
    gap: 10,
  },
  tasks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  jobs : {
    borderWidth:1,
    flex:1,
    flexDirection: 'row',
    padding:2,
    backgroundColor: "grey",
    borderRadius: 7
  }, 
  active: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 60,
  },
  ac: {
    borderWidth: 1,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 7
  }



})