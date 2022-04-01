import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import SearchScreen from "./SearchScreen";
import ListScreen from "./ListScreen";
import AddScreen from "./AddScreen";
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'List')
            iconName = focused
              ? 'list'
              : 'list-outline'
            else if (route.name === 'Add')
            iconName = focused
            ? 'add'
            : 'add-outline'
            else if (route.name === 'Search')
            iconName = focused
            ? 'search'
            : 'search-outline'
            else if (route.name === 'Account')
            iconName = focused
            ? 'person-circle'
            : 'person-circle-outline'
          ;

          return <Ionicons name={ iconName } size={ size } color={ color } />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="List" options={{ headerShown: false }} component={ ListScreen } />
      <Tab.Screen name="Add" options={{ headerShown: false }} component={ AddScreen } />
      <Tab.Screen name="Search" options={{ headerShown: false }} component={ SearchScreen } />
      <Tab.Screen name="Account" component={ AccountScreen } />
    </Tab.Navigator>
  );
};

export default HomeTabs;
