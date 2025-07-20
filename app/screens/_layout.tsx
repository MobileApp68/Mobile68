import { Stack } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function RootLayout() {
  return <Stack> 
    <Stack.Screen 
    name='MoreDetails'
    options={{
        headerStyle: {backgroundColor: 'green'},
        headerRight: () => <AntDesign style={{paddingRight: 10}} name="message1" size={24} color="black" />,
        headerTitle : () => <Text style={styles.title} >Individual Animals</Text>
    
    }}
    />
    <Stack.Screen 
    name='NewAnimal'
    options={{
      headerStyle: {backgroundColor: 'green'},
      headerRight: () => <AntDesign style={{paddingRight: 10}} name="message1" size={24} color="black" />,
      headerTitle : () => <Text style={styles.title} >Individual Animals</Text>
  
  }}
    />
        <Stack.Screen 
    name='AddAnimal'
    options={{
      headerStyle: {backgroundColor: 'green'},
      headerRight: () => <AntDesign style={{paddingRight: 10}} name="message1" size={24} color="black" />,
      headerTitle : () => <Text style={styles.title} >Individual Animals</Text>
  
  }}
    />
      <Stack.Screen 
    name='NewFeed'
    options={{
      headerStyle: {backgroundColor: 'green'},
      headerRight: () => <AntDesign style={{paddingRight: 10}} name="message1" size={24} color="black" />,
      headerTitle : () => <Text style={styles.title} >Individual Animals</Text>
  
  }}
    />  
    <Stack.Screen 
    name='AddFeed'
    options={{
        headerStyle: {backgroundColor: 'green'},
        headerRight: () => <AntDesign style={{paddingRight: 10}} name="message1" size={24} color="black" />,
        headerTitle : () => <Text style={styles.title} >Individual Animals</Text>
    
    }}
    />  
    <Stack.Screen 
    name='NewTemplate'
    options={{
        headerStyle: {backgroundColor: 'green'},
        headerRight: () => <AntDesign style={{paddingRight: 10}} name="message1" size={24} color="black" />,
        headerTitle : () => <Text style={styles.title} >New Template</Text>
    
    }}
    />
    <Stack.Screen 
    name='AddTemplate'
    options={{
        headerStyle: {backgroundColor: 'green'},
        headerRight: () => <AntDesign style={{paddingRight: 10}} name="message1" size={24} color="black" />,
        headerTitle : () => <Text style={styles.title} >Add Template</Text>
    
    }}
    />

  </Stack>;
}









const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: 'white'
    }
})