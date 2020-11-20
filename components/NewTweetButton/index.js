import React from 'react'
import { TouchableOpacity, View } from "react-native";
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NewTweetButton = () => {

    const onPress = () => {
        console.warn('Open new tweet')
    }
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <MaterialCommunityIcons name={"feather"} size={30} color= "white" />
        </TouchableOpacity>
    )
}

export default NewTweetButton;

