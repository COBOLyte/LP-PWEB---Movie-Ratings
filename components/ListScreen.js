import React, { useState } from "react";
import { View, FlatList, Pressable, TextInput } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from '@expo/vector-icons';

import SmallMovie  from "./SmallMovie";

const ListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [movieList, setmovieList] = useState([]);
  const [term, setTerm] = useState("");
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);
  const [isRatingFilterActive, setIsRatingFilterActive] = useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@movie_list');
      return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch(e) { console.log("Error while getting data: " + e); }
  }

  const storeData = async (value) => {
    try { await AsyncStorage.setItem('@movie_list', JSON.stringify([...movieList, value])); }
    catch (e) { console.log("Error while storing data: " + e); }
  }

  const addMovie = (movie) => {
    const element = {
      key: movieList.length,
      name: movie.name,
      overview: movie.overview,
      language: movie.language,
      releaseDate: movie.releaseDate,
      voteAverage: movie.voteAverage,
      picture: movie.picture,
      rating: (movie.rating > 0) ? movie.rating : 0 
    }

    setmovieList((current) => [...current, element]);
    storeData(element);
  }

  const filterByDate = () => {
    setIsDateFilterActive(true);
    setIsRatingFilterActive(false);

    movieList.sort((a, b) => {
      if (a.releaseDate < b.releaseDate) return -1;
      else if (a.releaseDate > b.releaseDate) return 1;
      return 0;
    });
  }

  const filterByRating = () => {
    setIsRatingFilterActive(true);
    setIsDateFilterActive(false);

    movieList.sort((a, b) => {
      if (a.voteAverage < b.voteAverage) return -1;
      else if (a.voteAverage > b.voteAverage) return 1;
      return 0;
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      // When screen FOCUSED
      getData().then((data) => setmovieList(data));

      return () => {
        // When screen UNFOCUSED (Useful for cleanup functions)
      };
    }, [])
  );

  useFocusEffect(() => {
    if (!route.params) return;

    if (route.params.addMovie) addMovie(route.params.addMovie);
    route.params.addMovie = null;
  });

  return (
    <View>
      <View style={{
        flexDirection: "row",
        backgroundColor: 'white',
        justifyContent: "space-around",
        alignItems: "center"
        }}
      >
        <TextInput
          defaultValue={ term }
          placeholder="Filter movie..."
          onChangeText={(newTerm) => setTerm(newTerm)}
          style={{ paddingStart: 10, height: 50 }}
        />
        <Pressable
          onPress={ filterByDate }
          style={{ flexDirection: "row" }}
        >
          <Ionicons name={(!isDateFilterActive) ? 'time-outline' : 'time'} color={ 'red' } size={ 20 } />
          <Ionicons name={ 'arrow-down' } color={ 'red' } size={ 20 } />
        </Pressable>
        <Pressable
          onPress={ filterByRating }
          style={{ flexDirection: "row" }}
        >
          <Ionicons name={(!isRatingFilterActive) ?'star-outline' : 'star'} color={ 'red' } size={ 20 } />
          <Ionicons name={ 'arrow-down' } color={ 'red' } size={ 20 } />
        </Pressable>
      </View>
      <FlatList
        data={ movieList }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Details", item)}
            style={{ display: (term && !item.name.includes(term)) ? "none" : "flex" }}
          >
            <SmallMovie
              name={ item.name }
              voteAverage={ item.voteAverage }
              rating= { item.rating }
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

export default ListScreen;
