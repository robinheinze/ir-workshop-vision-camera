import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Camera, useCameraDevices, useFrameProcessor } from "react-native-vision-camera"
import { checkCameraPermission } from "../utils/checkCameraPermissions"
import { useIsFocused } from "@react-navigation/native"
import { OCRFrame, scanOCR } from "vision-camera-ocr"
import { runOnJS } from "react-native-reanimated"

export const TextRecognitionScreen: FC<StackScreenProps<AppStackParamList, "TextRecognition">> =
  observer(function TextRecognitionScreen() {
    const devices = useCameraDevices()
    const device = devices.back
    const isFocused = useIsFocused()
    const [scannedOCR, setScannedOCR] = React.useState<OCRFrame>()

    useEffect(() => {
      checkCameraPermission()
    }, [])

    useEffect(() => {
      console.log(scannedOCR)
    }, [scannedOCR.result.text])

    const frameProcessor = useFrameProcessor((frame) => {
      "worklet"
      const scannedOcr = scanOCR(frame)
      runOnJS(setScannedOCR)(scannedOcr)
    }, [])

    if (device == null)
      return (
        <View style={$fullScreenCentered}>
          <ActivityIndicator />
        </View>
      )

    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
    )
  })

const $fullScreenCentered: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
