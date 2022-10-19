import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import { checkCameraPermission } from "../utils/checkCameraPermissions"
import { useIsFocused } from "@react-navigation/native"

export const FacialRecognitionScreen: FC<StackScreenProps<AppStackParamList, "FacialRecognition">> =
  observer(function FacialRecognitionScreen() {
    const devices = useCameraDevices()
    const device = devices.back
    const isFocused = useIsFocused()

    useEffect(() => {
      checkCameraPermission()
    }, [])

    if (device == null)
      return (
        <View style={$fullScreenCentered}>
          <ActivityIndicator />
        </View>
      )

    return <Camera style={StyleSheet.absoluteFill} device={device} isActive={isFocused} />
  })

const $fullScreenCentered: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
