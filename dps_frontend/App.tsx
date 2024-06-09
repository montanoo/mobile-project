// App.tsx
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Navigation from './src/components/Navigation';

const App: React.FC = () => {
  return <Navigation />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
