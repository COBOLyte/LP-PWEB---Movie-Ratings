import { View, Text, Image, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from '@expo/vector-icons';

const DetailsScreen = () => {
  const navigation = useNavigation();
  
  const { key, name, overview, language, releaseDate, voteAverage, picture, rating } = useRoute().params;

  const ratingCompleted = async (ratingChoosed) => {
    try {
      let movieList = await AsyncStorage.getItem('@movie_list');
      movieList = JSON.parse(movieList);
      movieList[key].rating = ratingChoosed;

      await AsyncStorage.setItem('@movie_list', JSON.stringify(movieList));
    } catch (e) { console.log("Error while getting data: " + e); }
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>

      <Image
        style={{ width: 150, height: 200 }}
        source={(!picture)
          ? require('../assets/not-found-pic.png')
          : { uri: (picture.startsWith("/")) ? "http://image.tmdb.org/t/p/w500" + picture : picture }
        }
      />

      <View style={{ alignItems: "center", marginStart: 20, marginEnd: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}>{ name }</Text>
        <Text numberOfLines={ 5 } style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>{ overview }</Text>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>{ releaseDate }</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name={ 'chatbubbles' } color={ 'red' } size={ 20 } />
          <Text style={{ textAlign: "center", textTransform: "uppercase" }}>{ language }</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name={ 'star' } color={ 'red' } size={ 20 } />
          <Text style={{ marginStart: 1 }}>{ voteAverage }</Text>
        </View>

      </View>
      {(rating >= 0) ?
        <AirbnbRating
          showRating={ false }
          count={ 10 }
          defaultRating={ rating }
          onFinishRating={ ratingCompleted }
          size={ 25 }
        />
      :
        <Button
          color="green"
          title="Add"
          onPress={() => navigation.navigate("List", {
            addMovie: {
              name: name,
              overview: overview,
              language: language,
              releaseDate: releaseDate,
              voteAverage: voteAverage,
              picture: "http://image.tmdb.org/t/p/w500" + picture
            }
          })}
        />
      }

    </View>
  );
};

export default DetailsScreen;
