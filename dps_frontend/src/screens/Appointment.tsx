import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from '../components/date/Picker';
import Doctors from '../requests/Doctors';
import Appointments from '../requests/Appointments';
import moment from 'moment';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default function Appointment() {
  const [description, setDescription] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  useEffect(() => {
    Doctors.get().then(res => {
      setDoctors(res.data);
    });
  }, []);

  const doctorItems = doctors.map(doctor => ({
    label: doctor.name,
    value: doctor.id,
  }));

  const schedule = () => {
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    Appointments.create({
      description,
      doctor_id: selectedDoctor,
      schedule: formattedDate,
    })
      .then(res => console.log(res.data))
      .catch(err => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Data:', err.response.data);
          console.log('Status:', err.response.status);
          console.log('Headers:', err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          console.log('Request:', err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', err.message);
        }
        console.log(err.config);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda una cita</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripcion"
        value={description}
        onChangeText={setDescription}
        keyboardType="default"
        autoCapitalize="none"
      />
      <RNPickerSelect
        placeholder={{
          label: 'Selecciona un doctor',
          value: null,
          color: 'grey',
        }}
        onValueChange={value => setSelectedDoctor(value)}
        style={pickerSelectStyles}
        items={doctorItems}
      />
      <DatePicker setDate={setDate} date={date} />
      <TouchableOpacity
        onPress={() => schedule()}
        style={{...styles.button, backgroundColor: 'rgb(34 197 94)'}}>
        <Text style={{...styles.buttonText}}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    alignItems: 'center',
  },
  register: {
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
});
