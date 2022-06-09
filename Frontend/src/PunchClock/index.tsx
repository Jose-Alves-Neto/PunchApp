import React from 'react'
import { Dimensions, SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const projects = [
  {
    label: 'OpenBot',
    value: 'OpenBot',
  },
  {
    label: 'I-Cybie',
    value: 'I-Cybie',
  },
  {
    label: 'Kinect',
    value: 'Kinect',
  },
];

export const PunchClock = () => {
  const [name, setName] = React.useState('');
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [project, setProject] = React.useState('');
  const [task, setTask] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>PunchApp</Text>
      <View>
        <TextInput
          style={styles.input}
          label='Name'
          value={name}
          onChangeText={setName}
          mode='outlined' />
        <DropDown
          mode='outlined'
          label='Project'
          list={projects}
          value={project}
          setValue={setProject}
          visible={showDropDown}
          showDropDown={() => { setShowDropDown(true); }}
          onDismiss={() => { setShowDropDown(false); }} />
        <Button>
          Start
        </Button>
        {/*Clock*/}
        <TextInput
          label='Task done'
          value={task}
          onChangeText={setTask}
          style={styles.input} />
        <Button>
          End
        </Button>
      </View >
    </SafeAreaView >
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
  input: {
    marginTop: 15,
    marginBottom: 15,
  },
});
