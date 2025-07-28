// LivestockIdScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import BASE_URL from '@/Utils/Api';


const LivestockID = () => {
  const [dbIds, setDbIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDbIds = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(BASE_URL+'/api/livestock/session-ids', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: token,
        });

        const result = await response.json();
        setDbIds(result);
      } catch (err) {
        Alert.alert("Error", "Could not fetch livestock IDs.");
      } finally {
        setLoading(false);
      }
    };

    fetchDbIds();
  }, []);

  const handlePress = (dbId) => {
    router.push({ pathname: "/User_Screens/Livestock/ViewLivestock", params: { dbId } });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading Livestock Sessions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

       <View style={{marginVertical:hp("2.5%")}}></View>
      
      <Text style={styles.header}>🐄 Livestock Sessions</Text>
      {dbIds.length === 0 ? (
        <Text>No livestock sessions found.</Text>
      ) : (
        dbIds.map((id, index) => (
          <Pressable key={index} style={styles.idButton} onPress={() => handlePress(id)}>
            <Text style={styles.idText}>{id}</Text>
          </Pressable>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  idButton: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  idText: { fontSize: 16, color: '#00796b', fontWeight: 'bold' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default LivestockID;
