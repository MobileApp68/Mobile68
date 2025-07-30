import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import BASE_URL from '../../../Utils/Api';
import { SafeAreaView } from 'react-native-safe-area-context';

const ViewLivestock = () => {
  const { dbId: paramDbId } = useLocalSearchParams();
  const [dbId, setDbId] = useState(paramDbId || '');
  const [livestockData, setLivestockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputDone, setInputDone] = useState(!!paramDbId);

  useEffect(() => {
    if (paramDbId) {
      console.log('Fetching with paramDbId:', paramDbId);
      setDbId(paramDbId);
      fetchLivestock(paramDbId);
    }
  }, [paramDbId]);

  const fetchLivestock = async (id = dbId) => {
    const livestockId = typeof id === 'string' ? id.trim() : String(id).trim();
    
    if (!livestockId) {
      Alert.alert('Input Required', 'Please enter a valid DBID.');
      return;
    }

    setLoading(true);
    setLivestockData(null); // Reset state
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      const response = await fetch(`${BASE_URL}/api/livestock/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          dbId: livestockId.toLowerCase(),
          token 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch livestock (Status: ${response.status})`);
      }

      const data = await response.json();
      console.log('Backend response:', data); // Log response
      const livestock = data.data || data; // Handle nested data
      if (!livestock || Object.keys(livestock).length === 0) {
        Alert.alert('No Data', 'No livestock found for this DBID.');
        setLivestockData(null);
        setInputDone(true);
        return;
      }
      setLivestockData(livestock);
      setInputDone(true);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', error.message || 'Failed to fetch livestock data');
      setLivestockData(null);
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading livestock data...</Text>
      </View>
    );
  }

  if (!inputDone) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🔍 Enter Livestock DBID</Text>
        <TextInput
          placeholder="Enter DBID"
          style={styles.input}
          value={dbId}
          onChangeText={setDbId}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable 
          style={[styles.fetchButton, loading && styles.disabledButton]}
          onPress={() => fetchLivestock(dbId)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Fetch Livestock'}
          </Text>
        </Pressable>
      </View>
    );
  }

  if (!livestockData || Object.keys(livestockData).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Data Found</Text>
        <Pressable 
          style={styles.fetchButton} 
          onPress={() => {
            setInputDone(false);
            setLivestockData(null);
            setDbId('');
          }}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} >
              <View style={{marginVertical:hp("2.5%")}}></View>
      
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
        onPress={() => router.push({ 
          pathname: './Update_DeleteLivestock', 
          params: { dbId: livestockData.dbId } 
        })}
      >
        <Text style={styles.buttonText}>✏️ Update</Text>
      </Pressable>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  fetchButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  fieldBox: { 
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 4,
    color: '#333',
  },
  valueBox: {
    maxHeight: 100,
  },
  value: { 
    fontSize: 16,
    color: '#555',
  },
  updateButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ViewLivestock;