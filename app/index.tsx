import { View, Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useEffect } from "react";
import { router } from "expo-router";

import pic from "../assets/images/agriMask.png";

export default function First() {

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/screens/Welcome"); 
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.img}>
                    <Image source={pic} style={{ width: wp("70%"), height: wp("70%"), resizeMode: "contain" }} />
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
    }
});
