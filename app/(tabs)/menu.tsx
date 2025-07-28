import { StyleSheet, Text, View, ScrollView, Pressable, SafeAreaView } from 'react-native'
import React from 'react'

import { useRouter } from 'expo-router'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const Menu = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.mainContent}>
        <View style={{marginVertical:hp("2.5%")}}></View>

          <Pressable style={styles.option} onPress={() => router.push('/(tabs)/livestock')}>
            <View style={styles.row}>
              <MaterialCommunityIcons name="cow" size={24} color="#2D5A3D" />
              <Text>Livestock</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />
          </Pressable>

          <Pressable style={styles.option} onPress={() => router.push('/(tabs)/tasks')}>
            <View style={styles.row}>
              <FontAwesome5 name="tasks" size={24} color="#2D5A3D" />
              <Text>Tasks</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />
          </Pressable>

          <Pressable style={styles.option} onPress={() => router.push('/User_Screens/ToolsScreen')}>
            <View style={styles.row}>
              <FontAwesome5 name="toolbox" size={24} color="#2D5A3D" />
              <Text>Tools</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />
          </Pressable>

          <Pressable style={styles.option} onPress={() => router.push('/User_Screens/WeatherScreen')}>
            <View style={styles.row}>
              <Ionicons name="cloud-outline" size={24} color="#2D5A3D" />
              <Text>Weather</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="#2D5A3D" />
          </Pressable>

        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F1'
  },
  mainContent: {
    gap: 10,
    padding: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: hp("2%"),
    alignItems: 'center',
    width: wp("85%"),
    height: hp("6%"),
  }
})
