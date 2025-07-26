import React, { useState } from 'react';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';

const ViewLivestock = () => {
  const [livestockData, setLivestockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dbId, setDbId] = useState('');
  const [inputDone, setInputDone] = useState(false); // control view switching

  const fetchLivestock = async () => {
    if (!dbId.trim()) {
      Alert.alert('Input Required', 'Enter Livestock ID.');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch('http://192.168.8.114:8080/api/livestock/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbId, token }),
      });

      if (response.ok) {
        const data = await response.json();
        setLivestockData(data);
        setInputDone(true); // switch to detail view
      } else {
        Alert.alert('Error', 'Failed to fetch livestock data.');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Unable to reach the server.');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, value) => (
    <View style={styles.fieldBox}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView style={styles.valueBox} nestedScrollEnabled>
        <Text style={styles.value}>{value || '—'}</Text>
      </ScrollView>
    </View>
  );

  // Show loading spinner
  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  // Initial screen: Ask for DBID
  if (!inputDone) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🔍 Enter Livestock DBID</Text>
        <TextInput
          placeholder="Enter DBID"
          style={styles.input}
          value={dbId}
          onChangeText={setDbId}
        />
        <Pressable style={styles.fetchButton} onPress={fetchLivestock}>
          <Text style={styles.buttonText}>Fetch Livestock</Text>
        </Pressable>
      </View>
    );
  }

  // Show data if fetched
  if (!livestockData) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🐄 Livestock Details</Text>

      {renderField('Livestock ID', livestockData.dbId)}
      {renderField('Animal Type', livestockData.animalType)}
      {renderField('Quantity', livestockData.quantity)}
      {renderField('Breed', livestockData.breed)}
      {renderField('Tag ID', livestockData.tagId)}
      {renderField('Age', livestockData.age)}
      {renderField('Health Status', livestockData.healthStatus)}
      {renderField('Notes', livestockData.notes)}

      <Pressable
        style={styles.updateButton}
        onPress={() => router.push({ pathname: 'UpdateLivestock', params: { dbId } })}
      >
        <Text style={styles.buttonText}>✏️ Update</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },

  fetchButton: {
    backgroundColor: '#a5d6a7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  fieldBox: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  valueBox: {
    maxHeight: 100,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  value: { fontSize: 16 },

  updateButton: {
    backgroundColor: '#cdeafe',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
});

export default ViewLivestock;
