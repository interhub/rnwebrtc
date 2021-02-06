import React, { useState } from "react";
import { Button, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { mediaDevices, RTCView } from "react-native-webrtc";
import { Colors } from "react-native/Libraries/NewAppScreen";

const App = () => {
  const [stream, setStream] = useState<any>(null);
  const start = async () => {
    console.log('start');
    const devices = await mediaDevices.enumerateDevices();
    console.log(devices);
    if (!stream) {
      let s;
      try {
        s = await mediaDevices.getUserMedia({ video: true });
        setStream(s);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const stop = () => {
    console.log('stop');
    if (stream) {
      stream.release();
      setStream(null);
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        {
          stream &&
          <RTCView
            streamURL={stream.toURL()}
            style={styles.stream} />
        }
        <View
          style={styles.footer}>
          <Button
            title="Start"
            onPress={start} />
          <Button
            title="Stop"
            onPress={stop} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: StyleSheet.absoluteFillObject,
  stream: {
    flex: 1
  },
  footer: {
    backgroundColor: Colors.lighter,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
});

export default App;