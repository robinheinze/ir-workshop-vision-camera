import React, { FC, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import { checkCameraPermission } from "../utils/checkCameraPermissions"
import { spacing } from "../theme"
import { CaptureButton } from "../components/CaptureButton"
import { useIsFocused, useNavigation } from "@react-navigation/native"

export const CameraScreen: FC<StackScreenProps<AppStackParamList, "Camera">> = observer(
  function CameraScreen() {
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()
    const camera = useRef<Camera>(null)
    const devices = useCameraDevices()
    const device = devices.back
    const isFocused = useIsFocused()

    useEffect(() => {
      checkCameraPermission()
    }, [])

    if (device == null) {
      return (
        <View style={$fullScreenCentered}>
          <ActivityIndicator />
        </View>
      )
    }

    const capture = async () => {
      const photo = await camera.current?.takePhoto({ flash: "auto" })
      navigation.navigate("Results", { results: { photo } })
    }

    return (
      <>
        <Camera
          ref={camera}
          photo={true}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
        />
        <View style={$captureButtonContainer}>
          <CaptureButton onPress={capture} />
        </View>
      </>
    )

    // TODO: Add a button to switch between front and back camera
  },
)

const $fullScreenCentered: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $captureButtonContainer: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.extraLarge,
}
