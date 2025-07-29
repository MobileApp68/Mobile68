import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";


import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useState } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialIcons';

import  BASE_URL  from "@/Utils/Api";
import pic from "../../assets/images/Stock-Valley.png";



function Login() {
  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
      
    let valid = true;

    const emailRegex = /\S+@\S+\.\S+/;

   
    if (email.trim() === "") {
      setUserError("Email is required");
      valid = false;
    } 
    else if (!emailRegex.test(email)) {
      setUserError("Enter full Email Address");
      valid = false;       
    }
     else {

      setUserError("");

    };

    if (password.trim() === "") {
      setPassError("Password is required");
      valid = false;
    } else {
      setPassError("");
    }

    if (!valid) return;

    try {

  setLoading(true);

  const response = await fetch(BASE_URL+"/api/auth/login", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password })
  });


  if (!response.ok) {
      setPassError("Invalid email or password");
      setLoading(false);
      return;
  }
  

  const data = await response.json();
  const token = data.token;

  // Store token in AsyncStorage
  await AsyncStorage.setItem("token", token);

  // Navigate to Main screen (home/dashboard)
  router.replace("/(tabs)/Home");

} catch (error) {
  
  Alert.alert("Login Failed", "Something went wrong. Please try again.");
} finally {
  setLoading(false);
}

  };

  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <View style={styles.img}>
            <Image source={pic} style={{ width: wp("17%"), height: hp("8%"), resizeMode: "contain" }} />
            <Text style={{ fontSize: wp("7%"), marginHorizontal: wp("2%") }}>Stock Valley</Text>
          </View>

          <Text style={styles.headertext}>Sign In With Your Stock Valley Account</Text>


          <View style={[styles.usernamearea, userError ? styles.errorBorder : null]}>
            <Icon name="email" size={24} color="gray" />
            <TextInput
              style={styles.txtin}
              placeholder="Email Address"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
                if (userError) setUserError("");
              }}
            />
          </View>
          {userError ? <Text style={styles.errorText}>{userError}</Text> : null}


          <View style={[styles.passarea, passError ? styles.errorBorder : null]}>
            <Icon name="lock-outline" size={24} color="gray" />
            <TextInput
              style={styles.passin}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passError) setPassError("");
              }}
              placeholder="Password"
              secureTextEntry={hide}
            />
            <Pressable onPress={() => setHide(!hide)} style={{ paddingHorizontal: wp("2%") }}>
              <Icon name={hide ? "visibility-off" : "visibility"} size={24} color="gray" />
            </Pressable>
          </View>
          {passError ? <Text style={styles.errorText}>{passError}</Text> : null}


          {/* Sign-in Button */}
          <Pressable onPress={handleSubmit} style={{ marginTop: hp("4%"), marginHorizontal: wp("5%") }}>
            <View style={styles.signin}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signinText}>Sign in</Text>
              )}
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(33, 168, 33, 0.5)",
    padding: wp("2%"),
    paddingTop: StatusBar.currentHeight,
  },

  img: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp("7%"),
    paddingHorizontal: wp("18%"),
  },

  headertext: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: wp("15%"),
  },

  usernamearea: {
    flexDirection: "row",
    backgroundColor: "white",
    height: hp("6%"),
    marginTop: hp("4%"),
    marginHorizontal: wp("5%"),
    paddingLeft: wp("2%"),
    justifyContent: "center",
    borderRadius: wp("3%"),
    alignItems: "center",
  },

  txtin: {
    fontSize: wp("5%"),
    flex: 1,
    height: hp("6%"),
    paddingLeft: wp("2%"),
    marginLeft: wp("2%"),
    borderRadius: wp("3%"),
  },

  passarea: {
    flexDirection: "row",
    backgroundColor: "white",
    height: hp("6%"),
    marginTop: hp("4%"),
    marginHorizontal: wp("5%"),
    paddingHorizontal: wp("2%"),
    borderRadius: wp("3%"),
    alignItems: "center",
  },

  passin: {
    fontSize: wp("5%"),
    flex: 1,
    height: hp("6%"),
    paddingLeft: wp("2%"),
    marginHorizontal: wp("2%"),
  },

  signin: {
    backgroundColor: "green",
    height: hp("6.5%"),
    justifyContent: "center",
    borderRadius: wp("3%"),
    alignItems: "center",
  },

  signinText: {
    textAlign: "center",
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: "white",
  },

  errorText: {
    color: "red",
    marginHorizontal: wp("5%"),
    marginTop: 5,
  },

  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
});

export default Login;
