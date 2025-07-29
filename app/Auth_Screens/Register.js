import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { BASE_URL } from "@/Utils/Api";



const Register = () => {

  const [username, setUsername] = useState("");
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


const API_URL = BASE_URL + "/api/auth/register";

const handleRegister = async () => {
  if (!username.trim()) {
    Alert.alert("Missing Field", "Please enter a username");
    return;
  }

  if (!email.trim()) {
    Alert.alert("Missing Field", "Please enter an email");
    return;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    Alert.alert("Invalid Email", "Please enter a valid email address");
    return;
  }

  if (!password.trim()) {
    Alert.alert("Missing Field", "Please enter a password");
    return;
  }

  if (password.length < 6) {
    Alert.alert("Weak Password", "Password must be at least 6 characters long");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post(API_URL, {
  username: username.trim(),
  email: email.trim().toLowerCase(),
  password
}, {
  timeout: 15000
});


    if (response.status === 201||response.status === 200) {
      Alert.alert("Success", "Registration complete!", [
        {
          text: "Go to Login",
          onPress: () => router.replace("/Auth_Screens/Login"),
        },
      ]);
    } 
      else{
      // Handle non-201 responses (e.g., 409)
      setLoading(false);
      const message = response.data?.message || "Something went wrong";
      Alert.alert("Registration Failed", message);
      return;
    }
  } catch (error) {
    setLoading(false);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Server error. Try again.";
    Alert.alert("Registration Failed", message);
    return;
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={{marginVertical:hp("2.5%")}}></View>

        <Text style={styles.title}>Register</Text>

         <View style={styles.textContainer}>
          <Icon name="person" size={24} color="gray" />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        </View>


        <View style={styles.textContainer}>
          <Icon name="email" size={24} color="gray" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        </View>

        <View style={styles.textContainer}>
          <Icon name="lock-outline" size={24} color="gray" />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={hide}
        />
        <Pressable onPress={() => setHide(!hide)} style={{ paddingHorizontal: wp("2%") }}>
           <Icon name={hide ? "visibility-off" : "visibility"} size={24} color="gray" />
        </Pressable>
        </View>

        
          <Pressable
            title="Register"
            onPress={handleRegister }
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            disabled={!username || !email || !password}
          >
          <View style={styles.registerContainer}>
                          {loading ? (
                            <ActivityIndicator color="#fff" />
                          ) : (
            <Text style={styles.registerText}>
              Register
            </Text>
             )}
            </View>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(33, 168, 33, 0.5)",
  },

  inner: {
    padding: 20,
    justifyContent: "center",
  },

  picker: {
    width:wp("48%"),
    height:hp("5%"),
    fontSize: wp("5%"),
    borderWidth:0,
    marginHorizontal: wp("2%"),
    textAlign:"center",
  },

  label:{
    paddingLeft: wp("2%"),
    flex:1,
    fontSize: wp("5%"),
    textAlign:"left",
  },

  title: {
    fontSize: wp("10%"),
    fontWeight: "bold",
     height: hp("6%"),
    textAlign: "center",
    marginBottom: hp("5%"),
    color: "#0b370dff",
  },

  input: {
     fontSize: wp("5%"),
    flex: 1,
    height: hp("6%"),
    paddingLeft: wp("2%"),
    borderRadius: wp("3%"),
  },

  textContainer: {
      flexDirection: "row",
      backgroundColor: "white",
      height: hp("6%"),
      marginBottom:hp("3%"),
      marginHorizontal: wp("5%"),
      justifyContent: "center",
      borderRadius: wp("3%"),
      alignItems: "center",
    },


    registerContainer: {
    backgroundColor: "green",
    height: hp("6.5%"),
    justifyContent: "center",
    borderRadius: wp("3%"),
    alignItems: "center",
  },

  registerText: {
    textAlign: "center",
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: "white",
  },

});


export default Register;
