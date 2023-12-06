// EditPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../APIContext.js';

// EditPage.js for editing a song's information
const EditPage = ({ route }) => {
  const { itemId, itemArtist, itemSong, itemRating } = route.params;
  const navigation = useNavigation();
  const { ipAddress } = useApi();

  const [artist, setArtist] = useState(itemArtist);
  const [song, setSong] = useState(itemSong);
  const [rating, setRating] = useState(itemRating.toString());

//   // send api call to update song
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://${ipAddress}/index.php/song/update?ratingid=${itemId}&artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&rating=${encodeURIComponent(rating)}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        // Handle success, e.g., show a success message
        console.log('Rating updated successfully');
        navigation.goBack(); // Go back to the previous screen after successful update
      } else {
        // Handle failure, e.g., show an error message
        console.error('Failed to update rating:', jsonResponse.message);
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

//   // render the edit page
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Rating</Text>
      <TextInput
        style={styles.input}
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
      />
      <TextInput
        style={styles.input}
        placeholder="Song"
        value={song}
        onChangeText={setSong}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <Button title="Update Rating" onPress={handleUpdate} />
      <Button title="Back" onPress={() => navigation.goBack()} />
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
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});

export default EditPage;
