import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { fill } from '@/eslint.config';

export default function Livestock() {
  

  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        🐄 Livestock Management
        </Text>

      <View style={styles.sessionbox}>
        <Text style={styles.sessiontext}>
          Livestock
        </Text>
        <Text style={styles.sessiontext}>
         Session
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/User_Screens/Livestock/LivestockID")}
      >
        <Text style={styles.buttonText}>📋 View All Livestock Session IDs</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/User_Screens/Livestock/ViewLivestock")}
      >
        <Text style={styles.buttonText}>📋 View Livestock</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/User_Screens/Livestock/CreateLivestock")}
      >
        <Text style={styles.buttonText}>➕ Add New Livestock</Text>
      </Pressable>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: wp("2%"),
    backgroundColor: '#F4F1F1'
     },

  header: {
    fontSize: wp("5%"),
    fontWeight: 'bold',
    marginBottom: hp("2%"),
    textAlign:"center"
   },

   sessionbox:{
    borderRadius: wp("5%"),
    borderWidth: wp("0.7%"),
    padding:wp("2%"),
    alignItems:"center",
    height:hp("35%"),
    justifyContent:"center",

   },

   sessiontext:{
    fontWeight:"bold",
    fontSize:wp("10%"),
    textAlign:"center",

   },

  button: {
    backgroundColor: 'rgba(10, 125, 143, 0.5)',
    padding: wp("5%"),
    borderRadius: wp("5%"),
    marginVertical: hp("2%"),
    borderWidth: wp("0.7%"),
  },

  buttonText: { 
    fontSize: wp("5%"), 
    fontWeight: '500'
   },

});
