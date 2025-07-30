import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from 'react-native-safe-area-context';

import BASE_URL from '../../../Utils/Api';



function CreateLivestock() {
  const [dbId, setDB_id] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [quantity, setQuantity] = useState();
  const [breed, setBreed] = useState('');
  const [tagId, setTagId] = useState('');
  const [age, setAge] = useState();
  const [healthStatus, setHealthStatus] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {

      const token = await AsyncStorage.getItem("token");

    const data = { dbId: dbId.trim().toLowerCase(), animalType, quantity, breed, tagId, age, healthStatus, notes, ownerToken: token};
    

    try {
      const response = await fetch(BASE_URL+'/api/livestock/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Alert.alert('Success', 'Livestock added successfully!');
      } 
      else {
        Alert.alert('Error', 'Failed to add livestock.');
      }
    }
     catch (error) {
      Alert.alert('Network Error', 'Could not reach server.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.header}>➕ Add New Livestock</Text>

      <TextInput style={styles.input} placeholder="Livestock ID (Unique ID)" placeholderTextColor="black"  value={dbId} onChangeText={setDB_id} />
      <TextInput style={styles.input} placeholder="Animal Type (e.g., Cow)" placeholderTextColor="black" value={animalType} onChangeText={setAnimalType} />
      <TextInput style={styles.input} placeholder="Number Of Animals (e.g.,1, 10)" placeholderTextColor="black" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Breed" placeholderTextColor="black" value={breed} onChangeText={setBreed} />
      <TextInput style={styles.input} placeholder="Tag ID" placeholderTextColor="black" value={tagId} onChangeText={setTagId} />
      <TextInput style={styles.input} placeholder="Age" placeholderTextColor="black" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Health Status" placeholderTextColor="black" value={healthStatus} onChangeText={setHealthStatus} />
      <TextInput style={styles.input} placeholder="Notes" placeholderTextColor="black" value={notes} onChangeText={setNotes} multiline />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>💾 Save Livestock</Text>
      </Pressable>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
      fontSize: wp("5%"),
      fontWeight: 'bold',
      marginBottom: hp("2%")

       },

  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: hp("2%"),
    marginVertical:hp("1.5%"),
    fontSize: wp("5%"),
  },

  button: {
    backgroundColor: '#c3f0ca',
    padding: hp("2%"),
    marginTop: hp("2%"),
    borderRadius: wp("2%"),
    alignItems: 'center',
  },

  buttonText: { 
    fontSize: wp("5%"),
     fontWeight: 'bold'
     },

});

export default CreateLivestock;
