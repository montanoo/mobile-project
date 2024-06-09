import React, {useState} from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container occupies the entire screen
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 22,
    flexGrow: 1, // Allow the content to grow vertically
    justifyContent: 'center', // Center the content vertically
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%', // Adjust based on your preference
    height: 100, // Adjust based on your preference
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 10, // Adjust based on your preference
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => {
  const user = useUserStore(state => state.user);
  const [appointments, setAppointments] = useState([]);
  const {navigate} = useAuthNavigation();
  const fetchAppointments = () => {
    if (user) {
      User.appointments()
        .then(res => {
          setAppointments(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch appointments whenever the screen comes into focus
      fetchAppointments();
    }, []),
  );
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <Image
            source={require('../assets/holding_books.jpg')}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 12,
              marginVertical: 50,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 48,
              paddingTop: 12,
              fontFamily: 'Inter-Bold',
            }}>
            Encuentra tu próxima cita:
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: 25,
              color: 'rgb(34 197 94)',
            }}>
            más rápido, más sencillo
          </Text>
          <TouchableOpacity onPress={() => navigate('Doctors')}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontSize: 20,
                color: 'black',
              }}>
              Conoce los doctores
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              maxWidth: '50%',
            }}>
            {!user && (
              <TouchableOpacity>
                <Text
                  style={{
                    padding: 12,
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: 12,
                    fontSize: 16,
                    marginTop: 12,
                    fontFamily: 'Inter-SemiBold',
                    textAlign: 'center',
                  }}
                  onPress={() => navigate('Login')}>
                  Empieza ya
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {user && (
          <View>
            <View style={{display: 'flex', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 36,
                  marginTop: 100,
                  fontFamily: 'Inter-Bold',
                }}>
                Tus citas:
              </Text>
              <TouchableOpacity onPress={() => navigate('Appointment')}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                  }}>
                  Agendar nueva cita +
                </Text>
              </TouchableOpacity>
              {appointments &&
                appointments.map((appointment, key) => (
                  <View
                    key={key}
                    style={{
                      backgroundColor: 'lightgrey',
                      padding: 12,
                      marginBottom: 10,
                      borderRadius: 12,
                    }}>
                    <View style={{display: 'flex', justifyContent: 'center'}}>
                      <Image
                        source={require('../assets/doctor.png')}
                        style={{
                          width: '100%',
                          height: 200,
                          borderRadius: 12,
                          marginTop: 25,
                          objectFit: 'cover',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Inter-Black',
                        paddingVertical: 10,
                      }}>
                      {appointment.description}
                    </Text>
                    <Text style={{color: 'black', fontFamily: 'Inter-Regular'}}>
                      Doctor:{' '}
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'Inter-Black',
                        }}>
                        {appointment.doctor.name}
                      </Text>
                    </Text>

                    <Text style={{color: 'black', fontFamily: 'Inter-Regular'}}>
                      Schedule:{' '}
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'Inter-Black',
                        }}>
                        {moment(appointment.schedule).format(
                          'MMMM Do YYYY, h:mm:ss a',
                        )}
                        {moment(appointment.schedule).isBefore(moment()) ? (
                          <Text> (Already passed)</Text>
                        ) : (
                          <Text>
                            {' '}
                            ({moment(appointment.schedule).fromNow()})
                          </Text>
                        )}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Inter-Black',
                      }}>
                      Editar cita
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
