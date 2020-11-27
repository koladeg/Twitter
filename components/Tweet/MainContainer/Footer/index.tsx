import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from "react-native";


import { API, graphqlOperation, Auth } from "aws-amplify";

import { TweetType } from '../../../../types';
import styles from './styles';
import { CreateLike } from '../../../../graphql/mutations';

export type FooterContainerProps = {
    tweet: TweetType,
}

const Footer = ({ tweet }: FooterContainerProps) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
        }
        fetchUser();
    }, [])

    const onLike = async () => {
        if (!user){
            return;
        }

        const like = {
            userID: user.attributes.sub,
            tweetID: tweet.id,
        }

       try {     
           await API.graphql(graphqlOperation(CreateLike, { input: like}))
       } catch (e) {
           console.log(e);
           
       } 
    }

    return (
        <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Feather name={"message-circle"} size={20} color={'grey'} />
            <Text style={styles.number}>{tweet.numberOfComments}</Text>
        </View>
        <View style={styles.iconContainer}>
            <EvilIcons name={"retweet"} size={28} color={'grey'} />
            <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
        </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onLike}>
                <AntDesign name={"hearto"} size={20} color={'grey'} />
            </TouchableOpacity>
            <Text style={styles.number}>{tweet.numberOfLikes}</Text>
        </View>
        <View style={styles.iconContainer}>
            <EvilIcons name={"share-google"} size={28} color={'grey'} />
        </View>
    </View>
    )
    
    }

export default Footer

