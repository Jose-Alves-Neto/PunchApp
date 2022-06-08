import React from 'react'
import { Dimensions, SafeAreaView, Text, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const PunchClock = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>PunchApp</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,

    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 50,
    color: '#fff',
    marginTop: windowHeight * 0.15,
  },
});
