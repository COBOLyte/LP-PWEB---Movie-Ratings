import { useState } from "react";
import { Button, View, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { AirbnbRating } from "react-native-ratings";

const AddScreen = () => {
  const navigation = useNavigation();

  const selectableLanguages = ["EN", "FR", "JA", "ES", "DE"];

  const [titleInput, setTitleInput] = useState("");
  const [overviewInput, setOverviewInput] = useState("");
  const [languagePick, setLanguagePick] = useState(selectableLanguages[0]);
  const [rating, setRating] = useState(0);
  const [picturePathInput, setPicturePathInput] = useState("");
  const [formValid, setFormValidValue] = useState(false);

  function getToday() {
    let d = new Date();
    let day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1)
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const setAddMovie = () => {
    const movie = {
      addMovie: {
        name: titleInput,
        overview: overviewInput,
        language: languagePick,
        voteAverage: 0,
        releaseDate: getToday(), 
        rating: rating,
        picture: picturePathInput
      }
    };

    setTitleInput("");
    setOverviewInput("");
    setPicturePathInput("");
    setRating(0);
    setLanguagePick(selectableLanguages[0]);

    return movie;
  }

  const validateForm = () => {
    if (titleInput && overviewInput) setFormValidValue(true);
    else setFormValidValue(false);
  }

  useFocusEffect(() => validateForm());

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        value={ titleInput }
        placeholder="Title"
        onChangeText={ (newTitleValue) => setTitleInput(newTitleValue) }
        style={{
          backgroundColor: 'white',
          width: 200,
          height: 50,
          textAlign: "center",
          margin: 10,
          borderColor: 'red',
          borderWidth: 2,
          borderRadius: 5
        }}
      />
      <TextInput
        value={ overviewInput }
        placeholder="Overview"
        multiline={ true }
        onChangeText={ (newOverviewValue) => setOverviewInput(newOverviewValue) }
        style={{
          backgroundColor: 'white',
          width: 200,
          height: 100,
          textAlign: "center",
          margin: 10,
          padding: 10,
          borderColor: 'red',
          borderWidth: 2,
          borderRadius: 5
        }}
      />
      <TextInput
        value={ picturePathInput }
        placeholder="Poster URL"
        multiline={ true }
        onChangeText={ (newPicturePathValue) => setPicturePathInput(newPicturePathValue) }
        style={{
          backgroundColor: 'white',
          width: 200,
          height: 50,
          textAlign: "center",
          margin: 10,
          padding: 10,
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 5
        }}
      />
      <Picker
        selectedValue={ languagePick }
        onValueChange={ (newLanguageValue) => setLanguagePick(newLanguageValue) }
        style={{ width: 100, margin: 10 }}
      >
        {selectableLanguages.map((language, key) => <Picker.Item label={ language } value={ language } key={ key } />)}
      </Picker>
      <AirbnbRating
        count={ 10 }
        defaultRating={ rating }
        onFinishRating={ setRating }
        showRating={ false }
        size={ 25 }
        starContainerStyle={{ marginBottom: 30 }}
      />
      <Button
        disabled={ !formValid }
        color="green"
        title="Save"
        onPress={() => navigation.navigate("List", setAddMovie())}
      />
    </View>
  );
};

export default AddScreen;
