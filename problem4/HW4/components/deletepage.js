import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../APIContext.js'; // Import the useApi hook

const DeletePage = ({ route }) => {
  const { itemId } = route.params;
  const navigation = useNavigation();
  const { ipAddress } = useApi();

  // confirm deletion before deleting
  const confirmDeletion = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this rating?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteRating() }
      ]
    );
  };

  const deleteRating = async () => {
    try {
      const response = await fetch(`http://${ipAddress}/index.php/song/delete?ratingid=${itemId}`, 
          {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });


      const data = await response.json();
      if (data.success) {
        Alert.alert(data.message)
        navigation.navigate('Main');
      } else {
        alert("Error deleting rating.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // render the delete page
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to delete this rating?</Text>
      <Button title="Delete Rating" onPress={confirmDeletion} />
      <Button title="Nevermind" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DeletePage;