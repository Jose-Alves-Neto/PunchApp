import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const Login = ({ navigation }) => {
  const [user_name, setUserName] = React.useState('');
  const [user_email, setUserEmail] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.logo}>PunchApp</Text>
        <View style={styles.forms}>
          <TextInput
            label='Github Name'
            value={user_name}
            onChangeText={setUserName}
            style={styles.input}
          />
          <TextInput
            label='Github Email'
            value={user_email}
            onChangeText={setUserEmail}
            style={styles.input}
          />
          <Button
            style={styles.button}
            mode='contained'
            onPress={() => {
              if (user_name && user_email) {
                navigation.navigate('PunchClock', {
                  user_name,
                  user_email,
                });
              }
            }}>
            Entrar
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#000',
    paddingHorizontal: windowWidth * 0.10,
  },
  logo: {
    alignSelf: 'center',
    fontSize: 40,
    color: '#fff',
    marginTop: windowHeight * 0.15,
  },
  forms: {
    marginTop: 40,
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});