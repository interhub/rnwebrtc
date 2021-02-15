import React, { useEffect, useState } from "react";
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { mediaDevices, RTCView } from "react-native-webrtc";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { io } from "socket.io-client";

const socket = io('http://192.168.0.101:3000');

socket.on('call', (data: any) => {
  console.log('CALL CLIENT MESSAGE', data, Platform.OS)
})

const callMessage = (data: any) => {
  socket.emit('message', data)
}

const App = () => {

  const [stream, setStream] = useState<any>(null);



  useEffect(() => {
    socket.on('call', (data: any) => {
      console.log('CALL CLIENT MESSAGE', data, Platform.OS)
      setStream(data)
    })
  }, [])

  const start = async () => {
    console.log('start');

    const devices = await mediaDevices.enumerateDevices();
    console.log(devices);
    if (!stream) {
      try {
        const s: any = await mediaDevices.getUserMedia({ video: true });
        // console.log('STREAM = ', s.toURL())
        // setStream(s.toURL()); 
        //s.toURL() - > ACCESS LOCATION FORMAT
        callMessage(s.toURL())

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
        {stream &&
          <RTCView
            mirror={true}
            streamURL={stream}
            style={styles.stream} />}
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