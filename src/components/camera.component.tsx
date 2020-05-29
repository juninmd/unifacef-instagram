import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RNCamera } from 'react-native-camera';

interface Props {
  onTakeCamera: (uri: string) => void
  status: boolean
}

export class CameraApp extends Component<Props> {
  render() {
    const PendingView = () => (
      <View
        style={{
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Carregando</Text>
      </View>
    );


    const status = this.props.status;

    return (
      <View>
        {status &&
          <View style={styles.container}>
            <RNCamera
              captureAudio={false}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              {({ camera, status, recordAudioPermissionStatus }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}>Fotografar</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </RNCamera>

          </View>}
      </View>
    );
  }

  takePicture = async (camera) => {
    const { onTakeCamera } = this.props;
    const options = { quality: 0.5, base64: true };
    try {
      const data = await camera.takePictureAsync(options);
      onTakeCamera(data.uri);
    } catch (error) {
      console.error(error);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 0,
    height: 600
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});