import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY' // Replace with your actual key

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        setLoading(false)
        return;
      }

      let location = await Location.getCurrentPositionAsync({})
      const { latitude, longitude } = location.coords

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        )
        const result = await response.json()
        setWeatherData(result)
      } catch (error) {
        setErrorMsg('Failed to fetch weather data')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2D5A3D" />
      </View>
    )
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    )
  }

  const weather = weatherData.weather[0]
  const main = weatherData.main

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weather</Text>
      <Text style={styles.location}>{weatherData.name}</Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png`,
        }}
        style={styles.icon}
      />
      <Text style={styles.temp}>{main.temp}°C</Text>
      <Text style={styles.description}>{weather.description}</Text>
    </View>
  )
}

export default WeatherScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5A3D',
    marginBottom: 10
  },
  location: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333'
  },
  icon: {
    width: 100,
    height: 100
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2D5A3D',
    marginVertical: 10
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: '#555'
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center'
  }
})
