import { Tabs } from 'expo-router/tabs';
import { FontAwesome5 } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
        }}
    >
      <Tabs.Screen
        name="index"
        options={{
            title:'Take a picture',
            headerShown: false,
            tabBarIcon: ({ focused,color, size }) => (
            <FontAwesome5 name="camera" size={24} style={{color: focused ? 'black' : color}} />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
            title:'Photos & their locations',
            headerShown: false,
            tabBarIcon: ({ focused,color, size }) => (
            <FontAwesome5 name="photo-video" size={24} style={{color: focused ? 'black' : color}} />
          ),
        }}
      />
    </Tabs>
  );
}