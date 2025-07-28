import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';
import BASE_URL from '@/Utils/Api';


const UpdateLivestock = () => {
  const { dbId } = useLocalSearchParams();
  const [livestockData, setLivestockData] = useState({
    dbId: dbId,
    animalType: '',
    quantity: '',
    breed: '',
    tagId: '',
    age: '',
    healthStatus: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const fetchLivestockDetails = async () => {
    try {
        setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(BASE_URL + '/api/livestock/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbId, token }),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        setLivestockData(data);
      } else {
        Alert.alert('Error', 'Could not fetch livestock details.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error occurred.');
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(BASE_URL + '/api/livestock/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...livestockData, ownerToken: token }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Livestock updated successfully.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        Alert.alert('Error', 'Failed to update livestock.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error during update.');
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this livestock?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              const response = await fetch(BASE_URL + '/api/livestock/delete', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ dbId: dbId, token: token, }) 
              });

              if (response.ok) {
                Alert.alert('Deleted', 'Livestock entry deleted.', [
                  { text: 'OK', onPress: () => router.push('../../(tabs)/livestock') },
                ]);
              } else {
                Alert.alert('Error', 'Failed to delete livestock.');
              }
            } catch (error) {
              Alert.alert('Error', 'Network error during deletion.');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchLivestockDetails();
  }, []);


  const renderInput = (label, field, editable = true) => (
  <View style={styles.fieldBox}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, !editable && { backgroundColor: '#eee' }]}
      value={livestockData[field]?.toString() || ''}
      editable={editable}
      onChangeText={(text) =>
        setLivestockData({ ...livestockData, [field]: text })
      }
    />
  </View>
);

if (loading) {
  return (
    <View style={styles.container}>
      <Text>Loading livestock data...</Text>
    </View>
  );
}
else{
 return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✏️ Update Livestock</Text>

      {renderInput('Livestock ID', 'dbId', false)} 
      {renderInput('Animal Type', 'animalType')}
      {renderInput('Quantity', 'quantity')}
      {renderInput('Breed', 'breed')}
      {renderInput('Tag ID', 'tagId')}
      {renderInput('Age', 'age')}
      {renderInput('Health Status', 'healthStatus')}
      {renderInput('Notes', 'notes')}

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>💾 Save Changes</Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>🗑️ Delete</Text>
      </Pressable>
    </ScrollView>
  );
};
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldBox: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#a5d6a7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#ef9a9a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
});

export default UpdateLivestock;
