import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function Button({title,icon,onPress,color}){
  return (
    <TouchableOpacity onPress={onPress} style={styles.Button}>
        <Entypo name={icon} size={24} color={color?color:'white'} />
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
    Button:{
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontWeight:'bold',
        fontSize:16,
        color: 'white',
        marginLeft:10
    }

})