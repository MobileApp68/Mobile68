import { Picker } from "@react-native-picker/picker";
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

const Register = () => {

  const [username, setUsername] = useState("");
    const [hide, setHide] = useState(true);
    const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("FARMER");

  const API_URL = "http://192.168.8.194:8080/api/auth/register";

  const handleRegister = async () => {
    router.replace('/(tabs)/Home')
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
      setLoading(false);
      const response = await axios.post(API_URL, {
        username: username.trim(),
        email: email.trim(),
        password,
        roles: [role], // Send as array: ["FARMER"] or ["ADMIN"]
      });

      if (response.status === 200 || response.status === 201) {
        router.replace("/screens/Login");
        Alert.alert("Success", "Registration complete!", [
          {
            text: "Go to Login",
            onPress: () => router.replace("/screens/Login"),
          },
        ]);
      } else {
        setLoading(false);
        Alert.alert("Failed", "Something went wrong");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Server error. Try again.";
      Alert.alert("Registration Failed", message);
     } 
     finally {
  setLoading(false);
}

  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
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

        <View style={styles.textContainer}>
        <Text style={styles.label}>Select Role:</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Farmer" value="FARMER" />
          <Picker.Item label="Admin" value="ADMIN" />
        </Picker>
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
