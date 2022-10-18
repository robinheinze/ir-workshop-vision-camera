import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Alert, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "../components"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { Camera } from "react-native-vision-camera"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

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

export const WelcomeScreen: FC = observer(function WelcomeScreen() {
  useEffect(() => {
    checkCameraPermission()
  }, [])
  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <SafeAreaView style={$bottomContainer} edges={["bottom"]}>
        <View style={$bottomContentContainer}>
          <Text tx="welcomeScreen.postscript" size="md" />
        </View>
      </SafeAreaView>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
}

const $bottomContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
