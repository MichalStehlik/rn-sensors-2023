import React, {useState, useEffect} from 'react';
import { Text, View, Button } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export const CompassScreen = props => {
    const [data, setData] = useState({ x: 0,  y: 0,  z: 0, });
    const [subscription, setSubscription] = useState(null);
    const _slow = () => {
        Magnetometer.setUpdateInterval(1000);
    };
    
    const _fast = () => {
        Magnetometer.setUpdateInterval(16);
    };
    
    const _subscribe = () => {
        setSubscription(
          Magnetometer.addListener(result => {
            setData(result);
          })
        );
    };
    
    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const { x, y, z } = data;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: "orange"}}>x: {Math.round(x)} y: {Math.round(y)} z: {Math.round(z)}</Text>
            <Button title={subscription ? "Off" : "On"} onPress={subscription ? _unsubscribe : _subscribe}/>
        </View>
    );
}

export default CompassScreen;