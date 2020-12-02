import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react'
import { View, Text } from "react-native";
import { S3Image } from "aws-amplify-react-native";

import { TweetType } from '../../../types';
import Footer from './Footer';
import styles from './styles';

export type MainContainerProps = {
    tweet: TweetType,
}

const MainContainer = ({ tweet }: MainContainerProps) => (
    <View style={styles.container}>
        <View style={styles.tweetHeaderContainer}>
            <View style={styles.tweetHeaderNames}>
                    <Text style={styles.name}>{tweet.user.username}</Text>
                    <Text style={styles.username}>@{tweet.user.username}</Text>
                    <Text style={styles.createdAt}>{moment(tweet.createdAt).fromNow()}</Text>
            </View>           
            <Entypo name={'chevron-down'} size={16} color={'grey'} />
            {/* <Text></Text> */}
        </View>
        <View>
            <Text style={styles.content}>{tweet.content}</Text>
            {!!tweet.image && <S3Image style={styles.image} imgKey={tweet.image}/>}
        </View>
        <Footer tweet={tweet} />
    </View>
)

export default MainContainer

