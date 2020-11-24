import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { API, graphqlOperation, Auth } from "aws-amplify";



import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, HomeNavigatorList, TabTwoParamList } from '../types';
import ProfilePicture from '../components/ProfilePicture';
import { getUser } from "../graphql/queries";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false,
        }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-notifications-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-mail" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<HomeNavigatorList>();

function HomeNavigator() {

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    
    // get current user
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true})
      if (!userInfo){
        return;
      }

      try {
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
        if(userData){
          setUser(userData.data.getUser);
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchUser();
  }, [])
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          headerRightContainerStyle : {
            marginRight: 15,
          },
          headerLeftContainerStyle : {
            marginLeft: 15,
          },
          headerTitle: () => (
            <Ionicons name={"logo-twitter"} color={Colors.light.tint} size={30} />
          ),
          headerRight: () => (
            <MaterialCommunityIcons name={"star-four-points-outline"} color={Colors.light.tint} size={30} />
          ),
          headerLeft: () => (
            <ProfilePicture image={ user?.image}  size={40} />
          ),
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
