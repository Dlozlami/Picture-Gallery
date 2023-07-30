import { Camera, CameraType, FlashMode } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, Image, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import Button from '../src/components/Button';

export default function CameraScreen(){
  const [location, setLocation] = useState(null);
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

      if (locationPermission===false) {
        console.log('Permission to access location was denied');
        return;
      }

      if (cameraPermission===false) {
        <Text>Permission to access the camera was denied</Text>;
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePicture = async ()=>{
    if(cameraRef)
    {
      try{
          const data = await cameraRef.current.takePictureAsync();
          console.log(data);
          setImage(data.uri)
      }catch(e){
        console.log(e)
      }
    }
  }

  const saveImage = async ()=>{
    if(image)
    {
      try{
          await MediaLibrary.createAssetAsync(image);
          alert("Picture saved 😃.")
          setImage(null)
      }catch(e){
        console.log(e)
      }
    }
  }

  return (
    <View style={styles.container}>
      {!image?
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <View style={styles.moreOptions}>
          <Button icon={"retweet"} onPress={()=>
            setType(type === CameraType.back ? CameraType.front : CameraType.back)
          }/>
          <Button icon={"flash"} color={flash=== FlashMode.off? 'gray':'white'} onPress={()=>setFlash(flash=== FlashMode.off? FlashMode.on:FlashMode.off)}/>
        </View>
      </Camera>
      :
      <Image source={{uri:image}} style={styles.camera}/>
      }
      <SafeAreaView>
          {image?
            <View style={styles.moreOptions}>
              <Button title={"Re-take"} icon={"retweet"} onPress={() => setImage(null)}/>
              <Button title={"Save"} icon={"check"} onPress={saveImage}/>
            </View>
          :
            <Button title={"Take a picture"} icon={"camera"} onPress={takePicture}/>
          }
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingVertical:20
  },
  camera:{
    flex:1,
    borderRadius:20
  },
  moreOptions:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:50
  }
});
