import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen 
        name='index'
        options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color}) => <MaterialIcons name="home" size={24} color="#2D5A3D" />
        }}
        />
        <Tabs.Screen 
        name='maps'
        options={{
            title: 'Maps',
            headerShown: false,
            tabBarIcon: ({color}) => <FontAwesome name="map-marker" size={24} color="#2D5A3D" /> 
        }}
        />
        <Tabs.Screen 
        name='livestock'
        options={{
            title: 'Livestock',
            headerShown: false,
            tabBarIcon: ({color}) => <MaterialIcons name="goat" size={24} color="#2D5A3D" /> 
        }}
        />        
        <Tabs.Screen 
        name='tasks'
        options={{
            title: 'Tasks',
            headerShown: false,
            tabBarIcon: ({color}) => <FontAwesome5 name="tasks" size={24} color="#2D5A3D" /> 
        }}
        />
        <Tabs.Screen 
        name='menu'
        options={{
            title: 'Menu',
            headerShown: false,
            tabBarIcon: ({color}) => <Ionicons name="menu" size={24} color="#2D5A3D" /> 

        }}
        />        

    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})