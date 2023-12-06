import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../UserContext';
import { useApi } from '../APIContext.js'; // Import the useApi hook

const MainPage = () => {
  const [ratings, setRatings] = useState([]);
  const [statsData, setStatsData] = useState(null); // Added state for stats data
  const navigation = useNavigation();
  const { username } = useContext(UserContext);
  const { ipAddress } = useApi();

// get song info and stats data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          // Fetch ratings data
          const responseRatings = await fetch(`http://${ipAddress}/index.php/song/list`);
          const dataRatings = await responseRatings.json();
          setRatings(dataRatings);

          // Fetch stats data
          const responseStats = await fetch(`http://${ipAddress}/index.php/song/stats`);
          const dataStats = await responseStats.json();
          setStatsData(dataStats);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();

      navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Logout"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      ),
    });
    }, [ipAddress, navigation])
    );
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ratings data
        const responseRatings = await fetch(`http://${ipAddress}/index.php/song/list`);
        const dataRatings = await responseRatings.json();
        setRatings(dataRatings);

        // Fetch stats data
        const responseStats = await fetch(`http://${ipAddress}/index.php/song/stats`);
        const dataStats = await responseStats.json();
        setStatsData(dataStats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); 

    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Logout"
          onPress={() => {
            // Implement your logout logic here
            // For example, navigate to the login screen
            navigation.navigate('Login'); // Adjust the screen name as needed
          }}
        />
      ),
    });
  }, [ipAddress, navigation]);*/

  // render each row of the flatlist
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.cell}>{item.username}</Text>
      <Text style={styles.cell}>{item.artist}</Text>
      <Text style={styles.cell}>{item.song}</Text>
      <Text style={styles.cell}>{item.rating}</Text>
      {username === item.username && (
        <Button
          title="Delete"
          onPress={() => navigation.navigate('deletepage', { itemId: item.id })}
        />
      )}
      {username === item.username && (
        <Button
          title="Edit"
          onPress={() => navigation.navigate('editpage', { itemId: item.id, itemArtist: item.artist, itemSong: item.song, itemRating: item.rating })}
        />
      )}
      <Button
        title="View"
        onPress={() => navigation.navigate('viewpage', { itemId: item.id, itemArtist: item.artist, itemSong: item.song, itemRating: item.rating })}
      />
    </View>
  );

  // render the main page
  return (
    <View style={styles.container}>
      <Text style={styles.username}>Welcome, {username}!</Text>
      <Button
        title="Add Rating"
        onPress={() => navigation.navigate('addSong')}
      />
      <FlatList
        style={styles.ratings}
        data={ratings}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.item}>
            <Text style={styles.cell}>Username</Text>
            <Text style={styles.cell}>Artist</Text>
            <Text style={styles.cell}>Song</Text>
            <Text style={styles.cell}>Rating</Text>
          </View>
        }
      />
      {statsData && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Artist Statistics</Text>
          <View style={styles.stats}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              data={statsData.artists}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text>
                  Artist: {item.artist}, Entry Count: {item.entry_count}, Average Rating: {item.average_rating}
                </Text>
              )}
            />
          </View>
          <Text style={styles.statsTitle}>Song Statistics</Text>
          <View style={styles.stats}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              data={statsData.songs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text>
                  Song: {item.song}, Entry Count: {item.entry_count}, Average Rating: {item.average_rating}
                </Text>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 0, // Adjust the marginBottom value as needed
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  cell: {
    marginRight: 10,
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  statsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    maxHeight: '50%',
  },
  stats: {
    flex: 1,
    width: '100%',
    // maxHeight: '50%', // Set the max height to 50% of the screen height
    marginBottom: 0,
  },
  ratings: {
    flex: 1,
    marginBottom: 0,
    maxHeight: '50%',
  },
});


export default MainPage;
