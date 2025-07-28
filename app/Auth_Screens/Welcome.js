import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Pressable,
  BackHandler,
} from "react-native";
import { router } from "expo-router";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginVertical:hp("2.5%")}}></View>

      <View style={styles.header}>
        <Text style={styles.headertext}>Welcome To Stock Valley</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>


        <Pressable  onPress={() => router.push("/Auth_Screens/Login")}>
        <View style={styles.acview}>
          <Text style={styles.headertext}>
            Sign In
          </Text>
          
        </View>
        </Pressable>

          <Pressable onPress={() => router.push("/Auth_Screens/Register")}>
         <View style={styles.acview}>
          <Text style={styles.headertext}>Sign Up</Text>
          
        </View> 
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07380aff",
  },

  header: {
    alignItems: "center",
    padding: hp("2%"),
  },

  headertext: {
    fontSize: hp("3%"),
    color: "rgba(144, 109, 6, 0.5)",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical:hp("1%"),
  },

  acview: {
    marginTop: hp("5%"),
    marginHorizontal: wp("10%"),
    alignItems: "center",
    backgroundColor:"rgba(26, 5, 67, 0.5)",
    borderRadius:hp("3%"),
    height:hp("10%"),
    justifyContent: "center",
  },

  prsble: {
    flexGrow:1,
    margin: hp("2%"),
    alignItems: "center",
    borderRadius:hp("2%"),
    backgroundColor:"rgba(41, 234, 77, 0.5)",
    width:wp("40%"),
    height:hp("7%"),
    justifyContent:"center",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:hp("2%"),

  },

});

export default Welcome;
