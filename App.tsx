import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground, Image} from 'react-native';
import { Camera } from 'expo-camera';
let camera: Camera | null

export default function App() {
  const [startCamera, setStartCamera] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.auto)
  

  const __startCamera = async ()=>{
    const {status} = await Camera.requestCameraPermissionsAsync()
    console.log(status)
  if(status === 'granted'){
    // start the camera
    setStartCamera(true)
  }else{
    Alert.alert("Access denied")
  }
  }
  const __takePicture = async () => {
    if (!camera) return
    // if the camera is undefined or null, we stop the function execution
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }
  const __savePhoto = () =>{}
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  const __handleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.on
        ? Camera.Constants.FlashMode.off
        : Camera.Constants.FlashMode.on
        
    );
  }
  
  const __switchCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    )

  }

  return (
    <View style={styles.container}>
      {startCamera ? (
          <View
            style={{
              flex: 1,
              width: '100%'
            }}
          >
        
          {previewVisible && capturedImage ? ( 
                  <CameraPerview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
                ) : (
                  <Camera
                    type={cameraType}
                    flashMode={flashMode}
                    style={{flex: 1}}
                    ref={(r) => {
                      camera = r
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: 'transparent',
                        flexDirection: 'row'
                      }}
                    >
                      
                     <TouchableOpacity
                        onPress={__handleFlashMode}
                        style={{
                          position: 'absolute',
                          left: '5%',
                          top: '10%',
                          backgroundColor: Camera.Constants.FlashMode.off ? '#000' : '#fff',
                          borderRadius: 50,
                          height: 25,
                          width: 25
                        }}
                        >
                          <Text
                              style={{
                                fontSize: 20
                              }}
                          >
                          ⚡️
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={__switchCamera}
                          style={{
                            marginTop: 20,
                            borderRadius: 50,
                            height: 25,
                            width: 25
                          }}
                          >
                            <Text
                              style={{
                                fontSize: 20
                              }}
                              >
                                {cameraType === 'front' ? '🤳' : '📷'}
                              </Text>
                          </TouchableOpacity>
                          
                      <View
                        style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'space-between'
                        }}
                      >

                        <View
                        style={{
                          alignSelf: 'center',
                          flex: 1,
                          alignItems: 'center'
                        }}
                        >
                          <TouchableOpacity
                          onPress={__takePicture}
                          style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius:50,
                            backgroundColor: '#fff'
                          }}
                          />
                      
                    </View>
                  </View>
                </View>
              </Camera>
            )}
          </View>
      ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <TouchableOpacity
            onPress={__startCamera}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40
              }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                  >
                    Take Picture
                  </Text>
            </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CameraPerview = ({photo, retakePicture, savePhoto}: any)=> {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
        >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}