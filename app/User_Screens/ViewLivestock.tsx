import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";



type Livestock = {
  id: string;
  animalType: string;
  breed: string;
  tagId: string;
  age: string;
  healthStatus: string;
  notes: string;
};

function ViewLivestock() {
  const [livestockList, setLivestockList] = useState<Livestock[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://your-backend-url/api/livestock');
        const data = await res.json();
        setLivestockList(data);
      } 
      catch (error) {
        console.error('Failed to load livestock data', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Livestock }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.animalType} - {item.breed}</Text>
      <Text style={styles .textview}>Tag ID: {item.tagId}</Text>
      <Text style={styles .textview}>Age: {item.age}</Text>
      <Text style={styles .textview}>Health: {item.healthStatus}</Text>
      <Text style={styles .textview}>Notes: {item.notes}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📋 Your Livestock</Text>
      <FlatList
        data={livestockList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: wp("2%")
   },

  header: {
     fontSize: wp("5%"), 
    fontWeight: "bold", 
    marginVertical: hp("1.5%"),
    textAlign:"center"

  },
  card: {
    backgroundColor: '#fff',
    padding: wp("2%"),
    marginVertical: hp("1.5%"),
    borderRadius: wp("2%"),
    borderWidth: wp("1%"),
    borderColor: '#ccc',
  },

  textview:{
    fontSize: wp("5%"),
    marginVertical:hp("1.5%"),
  },

  cardTitle: { 
    fontWeight: 'bold',
     fontSize: wp("5%"),
    marginBottom: hp("1.5%"),
   },
});

export default ViewLivestock;