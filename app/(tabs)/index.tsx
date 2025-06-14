import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from 'expo-router';

export default function App() {
  return (<>
    
    <View style={styles.container} >
      
      <View style={styles.header} >
        <View style={styles.three}  >
          <AntDesign name="star" size={24} color="red" />
          <Text style= {{fontSize:20, fontWeight: 'bold'}} >AgriWebb</Text>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
        </View>
      </View>


      <View style={styles.mainContent} >

        <View style={styles.farms} >
          <FontAwesome5 name="home" size={32} color="blue" />
          <View >
            <Text style={{fontWeight: 'bold', fontSize: 20}} >Marigold Farms</Text>
            <Text style={{fontSize: 20, opacity:500}}>Sunday 25th May 2025</Text>
          </View>
        </View>

        <View style={styles.coral} >
          <Text style={{color: 'white', fontSize: 20}} >Finish Setting Up Your Farm</Text>
          
        </View>

        <View style={styles.details} >
          <Text >Individual Animals</Text>
          <Text>More Details</Text>
        </View>        

        <View style={styles.animalSection} >
          <View style={styles.boxOne} >
            <Text>Bulls</Text>
            <Text>0</Text>
          </View>
          <View style={styles.boxTwo} >
            <Text>Cattle</Text>
            <Text>0</Text>
          </View>
          <View style={styles.boxThree} >
            <Text>Rams</Text>
            <Text>0</Text>
          </View>
          <View style={styles.boxFour} >
            <Text>Sheep</Text>
            <Text>0</Text>
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
            <View style={styles.ytdTwo}>
              <Text>Wet Days Ytd</Text>
              <Text>0</Text>              
            </View>            
          </View>
          <Entypo name="circle-with-plus" size={50} color="green" />
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
          <Entypo name="circle-with-plus" size={50} color="green" />
        </View>



      </View>



    </View>
    </> )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
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
  ytdTwo:{
    borderWidth:1,
    flex:1,
    height:100,    
    padding: 9,
    gap: 10,
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