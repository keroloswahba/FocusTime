import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import {CountDown} from '../../components/countdown';
import {RoundedButton} from '../../components/RoundedButton'
import {ProgressBar} from 'react-native-paper';
import {Timing} from './Timing';
import {useKeepAwake} from "expo-keep-awake"

const DEFAULT_tIME = .1;

export const Timer = ({focusSubject}) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_tIME)
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 3000);
    } else {
      Vibration.vibrate(3000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_tIME);
    setProgress(1);
    setIsStarted(false);
  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }


  return(
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown 
          isPaused={!isStarted} 
          onProgress={onProgress} 
          minutes={minutes} 
          onEnd={onEnd}
        />
      </View>

      <View style={{ paddingTop: 50 }}>
        <Text style={styles.title}>Focus on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={{ paddingTop: 30 }}>
        <ProgressBar 
          progress={progress}
          color="#5e84e2" 
          style={{height: 10}} 
        />
      </View>

      <View style={styles.buttonwrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      
      <View style={styles.buttonwrapper}>
     {isStarted ? <RoundedButton title='PAUSE' onPress={() => setIsStarted(false)} /> : <RoundedButton title='START' onPress={() => setIsStarted(true)} />}
      </View>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    color: "#ddd",
    textAlign: "center",
  },
  task: {
    color: "#ddd",
    textAlign: "center",
    fontWeight: "bold",
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonwrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})