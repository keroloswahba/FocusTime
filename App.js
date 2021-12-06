import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import FocusHistory from './src/features/focus/FocusHistory.js';
import {Focus} from './src/features/focus/Focus';
import {Timer} from './src/features/timer/timer';


function App() {
  const STATUSES = {
    COMPLETE: 1,
    CANCELLED: 2
  };

  const [ focusSubject, setFocusSubject ] = useState(null);
  const [ focusHistory, setFocusHistory ] = useState([]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    };
  };

  const loadFocusHistory = async () => {
    try {
      const savedFocusHistory = await AsyncStorage.getItem('focusHistory');

      if (saveFocusHistory && JSON.parse(savedFocusHistory).length) {
        setFocusHistory(JSON.parse(savedFocusHistory));
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const onClear = () => {
    setFocusHistory([]);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            onClear={onClear}
          />
        </View>
      )}
    </View>
  );
};

export default App;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250'
    
  },
});
 