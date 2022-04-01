import React, { useState } from "react";
import { Button, View, TextInput, Image } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");

  const logIn = async () => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify({ user: loginInput }));

      setLoginInput("");
      setpasswordInput("");

      navigation.navigate("MOVIE RATINGS");
    }
    catch (e) { console.log("Error while storing user: " + e); }
  }

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch(e) { console.log("Error while getting data: " + e); }
  }

  const [formValid, setFormValidValue] = useState(() => {
    getUser().then((data) => { if (data) navigation.navigate("MOVIE RATINGS") });
    return false;
  });

  const validateForm = () => {
    if (loginInput && passwordInput === "MR123") setFormValidValue(true);
    else setFormValidValue(false);
  }

  useFocusEffect(() => validateForm());

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 200, height: 200, marginBottom: 50 }}
        source={ require('../assets/logo.png') }
      />
      <TextInput
        value={ loginInput }
        placeholder="Login"
        onChangeText={(newLoginValue) => setLoginInput(newLoginValue)}
        style={{
          backgroundColor: 'white',
          width: 200,
          height: 50,
          textAlign: "center",
          margin: 10,
          borderWidth: 1,
          borderRadius: 50
        }}
      />
      <TextInput
        value={ passwordInput }
        placeholder="Password"
        secureTextEntry={ true }
        onChangeText={(newPasswordInput) => setpasswordInput(newPasswordInput)}
        style={{
          backgroundColor: 'white',
          width: 200,
          height: 50,
          textAlign: "center",
          margin: 10,
          borderWidth: 1,
          borderRadius: 50,
          marginBottom: 50
        }}
      />
      <Button
        disabled={ !formValid }
        color="red"
        title="Enter"
        onPress={ logIn }
      />
    </View>
  );
};

export default LoginScreen;
