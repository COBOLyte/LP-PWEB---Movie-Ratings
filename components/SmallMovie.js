import { View, Text, Image } from "react-native";

import { Ionicons } from '@expo/vector-icons';

const SmallMovie = ({ name, voteAverage, rating, picture, color }) => {
    return (
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
        backgroundColor: color,
        borderRadius: 5 }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={
            (!picture)
            ? require('../assets/not-found-pic.png')
            : { uri: (picture.startsWith("/")) ? "http://image.tmdb.org/t/p/w500" + picture : picture }
          }
        />
        <Text style={{ fontSize: 14, marginStart: 10 }}>
          { name + "\n" }
          <Ionicons name={ 'star' } color={ 'red' } />
          <Text style={{ fontSize: 10, marginStart: 1 }}>{ voteAverage }</Text>
          {
            (!rating)
            ? null
            : <>
              <Ionicons name={'star'} color={'#f1c40d'} style={{ marginStart: 10 }} />
              <Text style={{ fontSize: 10, marginStart: 1 }}>{ rating }</Text>
            </>
          }
        </Text>
      </View>
    );
  };

export default SmallMovie;
