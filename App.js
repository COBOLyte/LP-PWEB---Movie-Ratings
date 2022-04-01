import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailsScreen from "./components/DetailsScreen";
import LoginScreen from "./components/LoginScreen";
import HomeTabs from "./components/HomeTabs";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={ LoginScreen }
          options={{
            headerStyle: { backgroundColor: 'red' },
            headerTitleStyle: { color: 'white' }
          }}
        />
        <Stack.Screen
          name="MOVIE RATINGS"
          component={ HomeTabs }
          options={{
            headerBackVisible: false,
            headerStyle: { backgroundColor: 'red' },
            headerTitleStyle: { color: 'white', fontSize: 18 }
          }}
        />
        <Stack.Screen
          name="Details"
          component={ DetailsScreen }
          options={{
            headerStyle: { backgroundColor: 'red' },
            headerTitleStyle: { color: 'white' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
