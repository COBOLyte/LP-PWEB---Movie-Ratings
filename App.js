import * as React from 'react';
import { useState } from "react";
import { Button, View, Text, Image, TextInput, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MovieList = ({ navigation, route }) => {
  const [movieList, setMovieList] = useState([]);

  const addElement = (movie) => {
    const movieObj = {
      id: movieList.length,
      title: movie.title,
      summary: movie.summary,
      commentary: movie.commentary,
      rating: movie.rating,
      imgUrl: movie.posterUrl,
    }
    setMovieList((current) => [...current, movieObj]);
}

  useFocusEffect(() => {
    if (route.params.addElement) addElement(route.params.addElement);
    route.params.addElement = null;
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={movieList}
          renderItem={(movie) => (
            <MovieItem
              data={movie.item}
              goToDetails={() => {navigation.navigate('Details', movie.item)}}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <Button
        title="Add a movie"
        onPress={() => navigation.navigate('Add a movie')}
      />
    </View>
  );
}

const MovieItem = ({ data, goToDetails }) => {
  return (
  <View
    onClick={goToDetails}
    onTouchStart={goToDetails}
    style={styles.item}
  >
    <Text style={styles.title}>{data.title}</Text>
  </View>
  );
}

const MovieDetails = ({ route }) => {
  const {title, imgUrl, summary, commentary, rating} = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{width: 400, height: 400}}
        source={{uri: imgUrl}}
      />
      <Text>Title: {title}</Text>
      <Text>Summary: {summary}</Text>
      <Text>Commentary: {commentary}</Text>
      <Text>Rating: {rating}</Text>
    </View>
  );
}

const AddMovie = ({ navigation }) => {
  const [titleVal, setTitleValue] = useState("");
  const [summaryVal, setSummaryValue] = useState("");
  const [commentaryVal, setCommentaryValue] = useState("");
  const [ratingVal, setRatingValue] = useState("");
  const [posterUrlVal, setPosterUrlValue] = useState("");
  const [formValid, setFormValidValue] = useState(false);

  const checkTitle = (title) => {
    setTitleValue(title);
    validateForm();
  }

  const checkSummary = (summary) => {
    if (summary.length <= 50) setSummaryValue(summary);
    validateForm();
  }

  const checkCommentary = (commentary) => {
    if (commentary.length <= 100) setCommentaryValue(commentary);
    validateForm();
  }

  const checkRating = (rating) => {
    if (!isNaN(rating) && (rating >= 0 && rating <= 10) && rating.length <= 2)
    setRatingValue(rating);
    validateForm();
  }

  const checkPosterUrl = (posterUrl) => {
    setPosterUrlValue(posterUrl);
    validateForm();
  }

  const validateForm = () => {
    if (titleVal.length && summaryVal.length && commentaryVal.length && ratingVal.length && posterUrlVal.length) {
      setFormValidValue(true);
    } else {
      setFormValidValue(false);
    }
  }

  return (
  <View style={styles.formContainer}>
    <TextInput
      value={titleVal}
      placeholder="Title"
      onChangeText={checkTitle}
    />
    <TextInput
      value={summaryVal}
      placeholder="Summary"
      onChangeText={checkSummary}
    />
    <TextInput
      value={commentaryVal}
      placeholder="Commentary"
      onChangeText={checkCommentary}
    />
    <TextInput
      value={ratingVal}
      placeholder="Rating"
      onChangeText={checkRating}
    />
    <TextInput
      value={posterUrlVal}
      placeholder="Poster URL"
      onChangeText={checkPosterUrl}
    />
    <Button
      title="Add"
      disabled={!formValid}
      onPress={() => {navigation.navigate(
        "Movie Ratings", {
          addElement: {
            title: titleVal,
            summary: summaryVal,
            commentary: commentaryVal,
            rating: ratingVal,
            posterUrl: posterUrlVal
          }
        }
      )}}
    />
  </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movie Ratings" component={MovieList} initialParams={{ addElement: null }} />
        <Stack.Screen name="Details" component={MovieDetails} />
        <Stack.Screen name="Add a movie" component={AddMovie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    },
  item: {
    backgroundColor: '#ADD8E6',
    paddingLeft: 100,
    paddingRight: 100,
    marginVertical: 5,
    marginHorizontal: 50,
    borderRadius: 10
  },
  title: {
    fontSize: 30
  },
  poster: {
    width: 50
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
