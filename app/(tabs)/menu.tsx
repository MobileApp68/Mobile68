import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const menu = () => {
  return (
    <View style = {styles.container} >
      <Header/>

      <View style={styles.mainContent} >

        <View style={styles.might}>
          <View  style= {styles.adjust}>
            <MaterialCommunityIcons name="barn" size={24} color="black" />
            <Text>Farm</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="black" />
        </View>

        <View style={styles.might}>
          <View style= {styles.adjust}>
            <MaterialCommunityIcons name="clipboard-list" size={24} color="black" />
            <Text>Record Templates</Text>       
          </View>   
          <Entypo name="chevron-right" size={24} color="black" />
        </View>

        <View style={styles.might}>
          <View style= {styles.adjust}>
            <Ionicons name="brush-sharp" size={24} color="black" />
            <Text>Live Sessions</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="black" />
        </View>

        <View style={styles.might}>
          <View style= {styles.adjust}>
            <Entypo name="back-in-time" size={24} color="black" />
            <Text>Activity</Text> 
          </View> 
          <Entypo name="chevron-right" size={24} color="black" />         
        </View>

        <View style={styles.might}>
          <View style= {styles.adjust}>
            <SimpleLineIcons name="basket-loaded" size={24} color="black" />
            <Text>Feed Plans</Text>  
          </View>
          <Entypo name="chevron-right" size={24} color="black" />        
        </View>

        <View style={styles.might}>
          <View style= {styles.adjust}>
            <SimpleLineIcons name="basket-loaded" size={24} color="black" />
            <Text>Feed Plans</Text>  
          </View>
          <Entypo name="chevron-right" size={24} color="black" />        
        </View>

        <View style={styles.might}>
          <View style= {styles.adjust}>
            <SimpleLineIcons name="basket-loaded" size={24} color="black" />
            <Text>Feed Plans</Text>  
          </View>
          <Entypo name="chevron-right" size={24} color="black" />        
        </View>

        <View style={styles.might}>
          <View style= {styles.adjust}>
            <SimpleLineIcons name="basket-loaded" size={24} color="black" />
            <Text>Feed Plans</Text>  
          </View>
          <Entypo name="chevron-right" size={24} color="black" />        
        </View>

      </View>



    </View>
  )
}

export default menu

const styles = StyleSheet.create({
  container: {

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