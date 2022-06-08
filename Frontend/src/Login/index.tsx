import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import DropDown from "react-native-paper-dropdown";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const projects = [
  {
    label: 'Kinect',
    value: 'kinect',
  },
  {
    label: 'OpenBot',
    value: 'openbot',
  },
  {
    label: 'I-Cybie',
    value: 'icybie',
  },
];

export const Login = (navigation) => {
  const [name, setName] = React.useState('');
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [project, setProject] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>PunchApp</Text>
      <View style={styles.forms}>
        <TextInput
          style={styles.input}
          label='Name'
          value={name}
          onChangeText={setName}
          mode='outlined'
        />
        <DropDown
          mode='outlined'
          label='Project'
          list={projects}
          value={project}
          setValue={setProject}
          visible={showDropDown}
          showDropDown={() => { setShowDropDown(true) }}
          onDismiss={() => { setShowDropDown(false) }}
        />
        <Button
          style={styles.button}
          mode='contained'
          onPress={() => {
            if (name && project) {
              console.log('Login', name);
            }
          }}>
          Entrar
        </Button>
      </View>
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