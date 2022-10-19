import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import { checkCameraPermission } from "../utils/checkCameraPermissions"
import { useIsFocused } from "@react-navigation/native"
import { useScanBarcodes, BarcodeFormat } from "vision-camera-code-scanner"
import { RNHoleView } from "react-native-hole-view"

export const ScannerScreen: FC<StackScreenProps<AppStackParamList, "Scanner">> = observer(
  function ScannerScreen() {
    const devices = useCameraDevices()
    const device = devices.back
    const isFocused = useIsFocused()
    const dimensions = useWindowDimensions()

    const [frameProcessor, barcodes] = useScanBarcodes([
      BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
    ])

    useEffect(() => {
      checkCameraPermission()
    }, [])

    useEffect(() => {
      barcodes.forEach((barcode) => console.log(barcode.displayValue))
    }, [barcodes.length])

    if (device == null)
      return (
        <View style={$fullScreenCentered}>
          <ActivityIndicator />
        </View>
      )

    return (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        <RNHoleView
          holes={[
            {
              x: dimensions.width / 2 - 100,
              y: dimensions.height / 2 - 50,
              width: 200,
              height: 200,
              borderRadius: 10,
            },
          ]}
          style={$holeView}
        />
      </>
    )
  },
)

const $fullScreenCentered: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $holeView: ViewStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
}
