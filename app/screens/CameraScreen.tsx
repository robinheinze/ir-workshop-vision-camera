import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import { checkCameraPermission } from "../utils/checkCameraPermissions"

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
  },
)

const $fullScreenCentered: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
