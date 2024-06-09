import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import useAuthNavigation from '../hooks/useAuthNavigation';
import useUserStore from '../stores/user';
import User from '../requests/User';
import {useFocusEffect} from '@react-navigation/native';
import Doctors from '../requests/Doctors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 22,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'lightgrey',
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
  },
});

const Doctor = () => {
  const user = useUserStore(state => state.user);
  const [doctors, setDoctors] = useState([]);
  const {navigate} = useAuthNavigation();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await Doctors.get();
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {doctors.map((doctor, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/doctor.png')}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {doctor.name}
                </Text>
                <Text>{doctor.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Doctor;
