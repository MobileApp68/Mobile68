import { View, Image, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

import pic from "../assets/images/agriMask.png";

function First() {
  const [loading, setLoading] = useState(true); // For showing spinner

  function fetchWithTimeout(resource, options = {}, timeout = 5000) {
    return Promise.race([
      fetch(resource, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      )
    ]);
  }

  useEffect(() => {
    let isMounted = true; // Helps prevent state updates on unmounted screen

    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          return isMounted && router.replace("/screens/Welcome");
        }

        const response = await fetchWithTimeout("http://10.112.221.154:8080/api/auth/autologin", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }, 5000); // 5 seconds timeout

        if (isMounted) {
          if (response.ok) {
            router.replace("/(tabs)/livestock");
          } else {
            router.replace("/screens/Welcome");
          }
        }
      } catch (error) {
        console.error("Auto-login failed:", error.message);
        if (isMounted) {
          router.replace("/Auth_Screens/Welcome");
        }
      }
    };

    checkToken();

    // Cleanup function
    return () => { isMounted = false; };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.img}>
          <Image source={pic} style={styles.image} />
          {loading && (
            <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 30 }} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(8, 4, 48)",
    alignItems: "center",
  },
  img: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp("25%"),
  },
  image: {
    width: wp("70%"),
    height: wp("70%"),
    resizeMode: "contain",
  },
});

export default First;
