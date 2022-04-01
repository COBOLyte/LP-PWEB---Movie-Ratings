import React, { useState } from "react";
import { Button, View, Text } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState();

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      navigation.navigate("Login");
    }
    catch (e) { console.log("Error while removing user: " + e); }
  }

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch(e) { console.log("Error while getting data: " + e); }
  }

  useFocusEffect(
    React.useCallback(() => {
      // When screen FOCUSED
      getUser().then((data) => setUsername(data.user));

      return () => {
        // When screen UNFOCUSED (Useful for cleanup functions)
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>
      <Text style={{ fontSize: 32 }}>{ username }</Text>
      <Button
        color="blue"
        title="Log out"
        onPress={ logOut }
        style={{
          padding: 50
        }}
      />
    </View>
  );
};

export default AccountScreen;
