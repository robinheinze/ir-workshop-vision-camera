import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Alert, StyleSheet, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Camera, useCameraDevices } from "react-native-vision-camera"

const checkCameraPermission = async () => {
  let status = await Camera.getCameraPermissionStatus()
  if (status !== "authorized") {
    await Camera.requestCameraPermission()
    status = await Camera.getCameraPermissionStatus()
    if (status === "denied") {
      Alert.alert("You will not be able to scan if you do not allow camera access")
    }
  }
}

export const CameraScreen: FC<StackScreenProps<AppStackParamList, "Camera">> = observer(
  function CameraScreen() {
    const devices = useCameraDevices()
    const device = devices.back

    useEffect(() => {
      checkCameraPermission()
    }, [])

    if (device == null)
      return (
        <View style={$fullScreenCentered}>
          <ActivityIndicator />
        </View>
      )

    return <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />

    // TODO: Add a button to switch between front and back camera
    // TODO: Add a button to take a picture
    // TODO: Add modes for barcode scanning, QR code scanning, and face detection
  },
)

const $fullScreenCentered: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
