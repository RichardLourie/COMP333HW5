// ViewPage.js for viewing a song's information
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ViewPage = ({ route }) => {
// song info passed in as route params
  const { itemArtist, itemSong, itemRating } = route.params;
  const navigation = useNavigation();

//   // render the view page
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Song Information</Text>
      <View style={styles.songInfoContainer}>
        <Text>Artist: {itemArtist}</Text>
        <Text>Song: {itemSong}</Text>
        <Text>Rating: {itemRating}</Text>
      </View>
      <Button title="Back" onPress={navigation.goBack()} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  songInfoContainer: {
    alignItems: 'center', // Center content horizontally
  },
});

export default ViewPage;
