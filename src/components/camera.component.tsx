import { RNCamera, TakePictureOptions } from 'react-native-camera';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onTakeCamera: (uri?: string) => void
  status: boolean
}

export class Camera extends Component<Props> {

  render() {

    const PendingView = () => (
      <View style={styles.pendingView}><Text>Carregando..</Text></View>
    );

    const { status } = this.props;

    return (<View>
      {status &&
        <View style={styles.container}>
          <RNCamera
            captureAudio={false}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: 'Permissão para usar camera',
              message: 'Precisamos da sua persmissão para fotografar',
              buttonPositive: 'OK!',
              buttonNegative: 'Cancel'
            }}>
            {({ camera, status }) => {
              if (status !== 'READY') return <PendingView />
              return (
                <View>
                  <TouchableOpacity onPress={() => this.cancel()} style={styles.capture}>
                    <Text style={styles.titlePhoto}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Text style={styles.titlePhoto}>Fotografar</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          </RNCamera>
        </View>}
    </View>)
  }

  cancel = () => {
    const { onTakeCamera } = this.props;
    onTakeCamera();
  }

  takePicture = async (camera: RNCamera) => {
    const { onTakeCamera } = this.props;
    const options: TakePictureOptions = {
      quality: 0.5,
      base64: true
    }
    try {
      const data = await camera.takePictureAsync(options);
      onTakeCamera(data.uri);
    } catch (error) {
      console.error(error);
    }
  }
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
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  titlePhoto: {
    fontSize: 14
  },
  pendingView: {
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center'
  }
})