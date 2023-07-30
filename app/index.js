import { Camera, CameraType, FlashMode } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export default function CameraScreen(){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [flash, setFlash] = useState(FlashMode.off)
  const cameraRef = useRef(null);


  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setCameraPermission(cameraStatus.granted)
      setLocationPermission(locationStatus.granted)

      if (!locationPermission) {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      if (!cameraPermission) {
        setErrorMsg('Permission to access the camera was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
