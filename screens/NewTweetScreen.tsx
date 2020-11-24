import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { API, graphqlOperation, Auth } from "aws-amplify";
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfilePicture from '../components/ProfilePicture';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';
import { createTweet } from "../graphql/mutations";
import { useNavigation } from '@react-navigation/native';


export default function NewTweetScreen() {

  const[tweet,  setTweet] = React.useState("");
  const[imageUrl,  setImageUrl] = React.useState("");

  const navigation = useNavigation();
 
  const onPostTweet = async () => {
  
    try {
      const currentUser = await Auth.currentAuthenticatedUser( {bypassCache: true} );
      const newTweet = {
        content: tweet,
        image: imageUrl,
        userID: currentUser.attributes.sub,
      }
      await API.graphql(graphqlOperation(createTweet, {input: newTweet}));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } 
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={30} color={Colors.light.tint} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPostTweet}>
            <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
        <ProfilePicture image={'https://assets.paystack.com/assets/img/content/Collect-Payments-for-Multiple-Channels-1.1.gif'}/>
        <View style={styles.inputsContainer}>
            <TextInput 
              value={tweet}
              onChangeText= {value => setTweet(value)}
              numberOfLines={3}
              multiline={true}
              style={styles.tweetInput}
              placeholder={"What's happening?"}
            />
            <TextInput 
              value={imageUrl}
              onChangeText= {value => setImageUrl(value)}
              style={styles.imageInput}
              placeholder={"Image url (optional)"}
            />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  newTweetContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  inputsContainer: {
    marginLeft: 10,
  },
  tweetInput: {
    height: 100,
    maxHeight: 300,
    fontSize: 20,
  },
  imageInput: {
    
  },
});
