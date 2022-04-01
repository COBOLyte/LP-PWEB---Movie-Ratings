import { useState } from "react";
import { View, FlatList, Pressable, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SmallMovie  from "./SmallMovie";

const baseUrl = "https://api.themoviedb.org/3/search/movie";
const apiKey = "da54f4648a6050b16f34a0f0141e851f";

const createRequest = (obj) => {
  return (
    "?" +
    Object.keys(obj)
      .map((k) => k + "=" + obj[k])
      .join("&")
  );
};

const SearchScreen = () => {
  const navigation = useNavigation();
  
  const [term, onChangeTerm] = useState("");
  const [movieResults, setmovieResults] = useState([]);

  const formatMovieResult = (movie, index) => {
    return {
      key: index,
      name: movie.title,
      overview: movie.overview,
      language: movie.original_language,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      picture: movie.poster_path
    };
  };

  const fetchResults = async () => {
    if (!term) return;

    let res = await fetch(baseUrl + createRequest({ api_key: apiKey, query: term }));
    let json = await res.json();
    setmovieResults(json.results.map(formatMovieResult));
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          defaultValue={ term }
          placeholder="Enter movie..."
          onChangeText={ onChangeTerm }
          onSubmitEditing={ fetchResults }
          style={{ flex: 1, paddingStart: 10, height: 50, backgroundColor: 'white' }}
        />
      </View>
      <Button title="Search" onPress={ fetchResults } color="grey" />
        <FlatList
          data={ movieResults }
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("Details", item)}>
              <SmallMovie
                name={ item.name }
                voteAverage={ item.voteAverage }
                picture={ item.picture }
                color={ '#E0E0E0' }
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.key}
        />
    </View>
  );
};

export default SearchScreen;
