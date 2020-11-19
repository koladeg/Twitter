import React from 'react'
import { FlatList, View } from "react-native";
import tweets from '../../data/tweets';
import Tweet from '../Tweet';

const Feed = () => (
<FlatList  
    data={tweets} 
    renderItem={({item}) => <Tweet tweet={item} />} 
    keyExtractor={(item) => item.id}
/>
);

export default Feed;

