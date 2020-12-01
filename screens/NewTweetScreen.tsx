import { AntDesign } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import * as ImagePicker from 'expo-image-picker';
import ProfilePicture from '../components/ProfilePicture';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';
import { createTweet } from "../graphql/mutations";
import { useNavigation } from '@react-navigation/native';


export default function NewTweetScreen() {

  const[tweet,  setTweet] = React.useState("");
  const[imageUrl,  setImageUrl] = React.useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      const res = await fetch(imageUrl)

      const blob = await res.blob()

      const urlParts = imageUrl.split('.');
      const extension = urlParts[urlParts.length - 1]

      const key = `random generate.${extension}`
      //const response = await Storage.put('')
    } catch (error) {
      
    }
  }
 
  const onPostTweet = async () => {
    await uploadImage();
    return;
  
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
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.pickImage}>Pick an Image</Text>
            </TouchableOpacity>
            <Image source={{ uri: imageUrl }} style={styles.image} />
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
  pickImage: {
    fontSize:18,
    color: Colors.light.tint
  },
  image: {
    width: 150,
    height: 150,
  }
});
