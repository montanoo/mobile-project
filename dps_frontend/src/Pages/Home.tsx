import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: 'black',
  },
});

export default function Home() {
  return (
    <View style={styles.Wrapper}>
      <Text>Hola!</Text>
    </View>
  );
}
