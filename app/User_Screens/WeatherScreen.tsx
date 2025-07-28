import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Replace with your actual OpenWeatherMap API key from https://openweathermap.org/api
const API_KEY = 'f3c3332a6d4db67cf064b33cf90df8fd';

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Denied',
          'Please enable location services to get weather updates.',
          [
            { text: 'OK' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = location.coords;
      if (!latitude || !longitude) {
        throw new Error('Invalid location coordinates');
      }
      console.log('Location fetched:', { latitude, longitude });

      // Fetch weather data
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      console.log('Weather API response status:', response.status);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: 'Unknown error' };
        }
        console.log('Weather API error response:', errorData);

        if (response.status === 401) {
          throw new Error('Invalid API key. Please verify your OpenWeatherMap API key.');
        } else if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(errorData.message || `Failed to fetch weather data (Status: ${response.status})`);
        }
      }

      const result = await response.json();
      console.log('Weather API response:', result);
      setWeatherData(result);
    } catch (error) {
      console.error('Weather fetch error:', error.message);
      setErrorMsg(error.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleRefresh = () => {
    fetchWeather();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2D5A3D" />
        <Text style={styles.loadingText}>Loading weather...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <Pressable style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!weatherData || !weatherData.weather || !weatherData.main) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No weather data available</Text>
        <Pressable style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const weather = weatherData.weather[0];
  const main = weatherData.main;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weather</Text>
      <Text style={styles.location}>{weatherData.name || 'Unknown Location'}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.icon || '01d'}@4x.png` }}
        style={styles.weatherIcon}
        resizeMode="contain"
      />
      <Text style={styles.temperature}>{main.temp.toFixed(1)}°C</Text>
      <Text style={styles.description}>{weather.description || 'N/A'}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>Feels Like: {main.feels_like?.toFixed(1)}°C</Text>
        <Text style={styles.details}>Humidity: {main.humidity || 'N/A'}%</Text>
        <Text style={styles.details}>Pressure: {main.pressure || 'N/A'} hPa</Text>
      </View>
      <Pressable style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh Weather</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('5%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#2D5A3D',
    marginBottom: hp('2%'),
  },
  location: {
    fontSize: wp('4.5%'),
    marginBottom: hp('2%'),
    color: '#333',
  },
  weatherIcon: {
    width: wp('25%'),
    height: wp('25%'),
    marginVertical: hp('2%'),
  },
  temperature: {
    fontSize: wp('10%'),
    fontWeight: 'bold',
    color: '#2D5A3D',
    marginVertical: hp('1%'),
  },
  description: {
    fontSize: wp('4.5%'),
    textTransform: 'capitalize',
    color: '#555',
    marginBottom: hp('2%'),
  },
  detailsContainer: {
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  details: {
    fontSize: wp('4%'),
    color: '#333',
    marginVertical: hp('0.5%'),
  },
  loadingText: {
    fontSize: wp('4%'),
    color: '#2D5A3D',
    marginTop: hp('2%'),
  },
  errorText: {
    fontSize: wp('4.5%'),
    color: 'red',
    textAlign: 'center',
    marginBottom: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  retryButton: {
    backgroundColor: '#2D5A3D',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2%'),
  },
  retryButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#2196F3',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2%'),
    marginTop: hp('2%'),
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default WeatherScreen;