import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import pic from "../assets/images/Stock-Valley.png";
import BASE_URL from "../Utils/Api";


function First() {
  const [loading, setLoading] = useState(true); 

  function fetchWithTimeout(resource, options = {}, timeout = 5000) {
    return Promise.race([
      fetch(resource, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      )
    ]);
  }

  useEffect(() => {
    let isMounted = true; 

    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          return isMounted && router.replace("/Auth_Screens/Welcome");
        }

        const response = await fetchWithTimeout(BASE_URL+"/api/auth/autologin", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }, 5000);

        if (isMounted) {
          if (response.ok) {

            router.replace("/(tabs)/livestock");
          } 
          else {
            router.replace("/Auth_Screens/Welcome");
          }
        }
      } catch (error) {

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
