import React, { FC, useEffect } from "react"
import { runOnJS } from "react-native-reanimated"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Camera, useCameraDevices, useFrameProcessor } from "react-native-vision-camera"
import { checkCameraPermission } from "../utils/checkCameraPermissions"
import { useIsFocused } from "@react-navigation/native"
import { scanFaces, Face } from "vision-camera-face-detector"

export const FacialRecognitionScreen: FC<StackScreenProps<AppStackParamList, "FacialRecognition">> =
  observer(function FacialRecognitionScreen() {
    const devices = useCameraDevices()
    const device = devices.back
    const isFocused = useIsFocused()
    const [faces, setFaces] = React.useState<Face[]>([])

    useEffect(() => {
      checkCameraPermission()
    }, [])

    React.useEffect(() => {
      console.log(faces)
    }, [faces?.length])

    const frameProcessor = useFrameProcessor((frame) => {
      "worklet"
      const scannedFaces = scanFaces(frame)
      runOnJS(setFaces)(scannedFaces)
    }, [])

    if (device == null)
      return (
        <View style={$fullScreenCentered}>
          <ActivityIndicator />
        </View>
      )

    const face = faces[0]

    return (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {faces.length > 0 && (
          <View
            style={[
              $faceBox,
              {
                top: face.bounds.y - face.bounds.height / 2,
                right: -1 * (face.bounds.x - face.bounds.width / 2),
                height: face.bounds.height,
                width: face.bounds.width,
              },
            ]}
          />
        )}
      </>
    )
  })

const $fullScreenCentered: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $faceBox: ViewStyle = {
  position: "absolute",
  borderColor: "green",
  borderWidth: 2,
}
