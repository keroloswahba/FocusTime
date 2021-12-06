import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;


export const CountDown = ({
  minutes=1,
  isPaused,
  onProgress,
  onEnd
}) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000/ 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  const interval = React.useRef(null)

  const countDown = () => {
    setMillis((time) => {
      if(time === 0) {
        clearInterval(interval.current)
        onEnd();
        return time;
      } else {
        const timeLeft = time - 1000;
        onProgress(timeLeft/minutesToMillis(minutes));
        return timeLeft;
      }
    })
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes])

  useEffect(() => {
    if(isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current)
  }, []);

  return (
    <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    fontSize: 80,
    fontWeight: 'bold',
    color: "#ddd",
    padding: 20,
    backgroundColor: "rgb(94, 132, 26, 0.3)"
  }
})