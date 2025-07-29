
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Button,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BASE_URL from '@/Utils/Api';

function Maps() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [farmLocation, setFarmLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [farmName, setFarmName] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  const initializeMap = async () => {

    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

    const response = await fetch(BASE_URL+"/api/farms?token="+token);

      if (response.ok) {
        const farm = await response.json();

        if (farm && farm.latitude && farm.longitude) {
          const { name, latitude, longitude } = farm;

          setFarmLocation({ latitude, longitude });
          setFarmName(name);
          setUserLocation({ latitude, longitude }); // Center map on farm
        } else {
          // No farm in DB, use GPS
          const location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setUserLocation(coords);
        }
      } else {

        const location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setUserLocation(coords);
      }
    } catch (error) {
      console.error("Error fetching farm or location:", error);
      Alert.alert("Error", "Could not fetch farm or location");

      // Fallback to GPS
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(coords);
    }
  };

  initializeMap();
}, []);


  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setFarmLocation({ latitude, longitude });
    setShowModal(true); // Show modal to ask for name
  };

  const handleSave = async () => {
  
    const token = await AsyncStorage.getItem("token");

    if (!farmName || !farmLocation) {
      Alert.alert('Error', 'Please enter a name and select a location');
      return;
    }

    try {
      const response = await fetch(BASE_URL+'/api/farms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: farmName,
          latitude: farmLocation.latitude,
          longitude: farmLocation.longitude,
          ownertoken: token
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Farm location saved');
        setShowModal(false);
        setFarmName('');
      } else {
        Alert.alert('Error', 'Failed to save location');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while saving');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
        >
          <Marker coordinate={userLocation} title="You are here" pinColor="blue" />
          {farmLocation && (
            <Marker coordinate={farmLocation} title={farmName || 'Farm Location'} pinColor="green" />
          )}
        </MapView>
      )}

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Farm Name To Update Farm Data</Text>
            <TextInput
              placeholder="e.g. My Farm"
              style={styles.input}
              value={farmName}
              onChangeText={setFarmName}
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: 'gray' }]}
                onPress={() => {
                  setShowModal(false);
                  setFarmName('');
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Maps;