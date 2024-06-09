import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({setDate, date}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    hideDatePicker();
  };

  console.log(date, 'deiv');
  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <Text style={{...styles.buttonText}}>Escoge fecha</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date ? new Date(date) : new Date()}
        onConfirm={handleConfirm}
        minimumDate={new Date()}
        onCancel={hideDatePicker}
      />
      <Text style={{paddingTop: 2, fontFamily: 'Inter-Bold'}}>
        Seleccionado: {date.toLocaleString('en-GB')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default DatePicker;
