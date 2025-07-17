import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack> 
    <Stack.Screen 
    name='MoreDetails'
    options={{
        headerStyle: {backgroundColor: '2D5A3D'}
    
    }}
    />
    <Stack.Screen 
    name='NewAnimal'
    options={{
        headerStyle: {backgroundColor: '2D5A3D'}
    
    }}
    />

  </Stack>;
}
