import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import axios from 'axios';
import { router } from "expo-router";
import BASE_URL from '@/Utils/Api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [livestockCount, setLivestockCount] = useState(0);
  const [temperature, setTemperature] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      // Fetch username
      const usernameRes = await fetch(BASE_URL + '/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token,
      });

      const usernameData = await usernameRes.json();
      setUsername(usernameData.username);

      // Fetch livestock count
      const livestockRes = await fetch(BASE_URL + '/api/livestock/count', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token,
      });
      const livestockData = await livestockRes.json();
      setLivestockCount(livestockData.livestockCount || 0);

      // Get location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Location permission not granted");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      console.log("User Location:", loc.coords);

      const geocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (geocode.length > 0) {
        const { city, region, country } = geocode[0];
        setLocationName(`${city || 'Unknown'}, ${region || ''}, ${country || ''}`);
      }

      // Fetch weather
      const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${loc.coords.latitude}&longitude=${loc.coords.longitude}&current_weather=true`);
      setTemperature(weatherRes.data.current_weather.temperature);

    } catch (error) {
      console.error('HomeScreen error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3a7d44']} // Android
            tintColor="#3a7d44" // iOS
          />
        }
      >
        <View style={{marginVertical:hp("2.5%")}}></View>
          
        <Text style={styles.greeting}>{getGreeting()}, {username} 👋</Text>
        
        <View style={{flexDirection: 'column'}}>
          <Pressable onPress={() => router.push("/User_Screens/Livestock/LivestockID")}>
            <View style={styles.card}>
              <Text style={styles.title}>🐄 Livestock Sessions</Text>
              <Text style={styles.value}>{livestockCount}</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push("/User_Screens/WeatherScreen")}>
            <View style={styles.card}>
              <Text style={styles.title}>🌡️ Temperature</Text>
              <Text style={styles.value}>{temperature}°C</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push("/(tabs)/maps")}>
            <View style={styles.card}>
              <Text style={styles.title}>📍 Location</Text>
              <Text style={styles.value}>{locationName}</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push("/User_Screens/ToolsScreen")}>
            <View style={styles.card}>
              <Text style={styles.title}>🧰 Tools Management</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    flex:1,
    padding: wp("1.2%"),
    backgroundColor: 'rgba(196, 206, 196, 1)',
  },
  greeting: {
    fontSize: wp("7%"),
    fontWeight: 'bold',
    marginTop: hp("1.2%"),
    marginBottom: hp("2%"),
    textAlign:"center",
  },
  card: {
    backgroundColor: '#f3f3f3',
    padding: wp("4"),
    borderRadius: wp("4"),
    height: hp("20%"),
    width: wp("80%"),
    marginBottom: hp("2%"),
    justifyContent:"center",
    borderWidth: wp("0.7%"),
    marginHorizontal: wp("7%"),
  },
  title: {
    fontSize: wp("7%"),
    color: '#555',
    fontWeight:"bold",
    textAlign:"center",
  },
  value: {
    fontSize: wp("7%"),
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: "center",
  },
});