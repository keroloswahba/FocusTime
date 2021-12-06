import React, {useState} from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import {TextInput} from 'react-native-paper';
import {RoundedButton} from '../../components/RoundedButton';

export const Focus = ({addSubject}) => {
  const [item, setItem] = useState(null)
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={{ flex: 1, marginRight: 20 }} 
            onSubmitEditing={({ nativeEvent }) => {
              addSubject(nativeEvent.text)
            }}
          />
          <RoundedButton 
            title="+" size={60}
            onPress={() => {
              addSubject(item)
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  inputContainer: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: 'center'
  }
});
