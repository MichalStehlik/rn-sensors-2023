import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export const CameraScreen = () => {
    const [type, setType] = useState(CameraType.back);
    const [running, setRunning] = React.useState(false);
    const cam = useRef();

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    };

    const CameraPressHandler = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        if(status === 'granted'){
            setRunning(true);
        } else {
            Alert.alert("Access denied")
        }
    }
  
if (running) {
    return (
        <Camera
          style={{flex: 1,width:"100%"}}
          type={type}
          ref={cam}
        ></Camera>
    );
}
else
{
    return (
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40
              }}
              onPress={CameraPressHandler}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Kamera
              </Text>
            </TouchableOpacity>
          </View>
    
          <StatusBar style="auto" />
        </View>
    );
}
    
}

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })