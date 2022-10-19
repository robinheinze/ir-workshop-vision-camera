import React from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { colors } from "../theme"

export const CaptureButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={$captureButton}>
          <View style={pressed ? $captureButtonInnerPressed : $captureButtonInner} />
        </View>
      )}
    </Pressable>
  )
}

const $captureButton: ViewStyle = {
  width: 64,
  height: 64,
  borderRadius: 32,
  borderWidth: 4,
  borderColor: "white",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
}

const $captureButtonInner: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: "white",
}

const $captureButtonInnerPressed: ViewStyle = {
  ...$captureButtonInner,
  backgroundColor: colors.border,
}
