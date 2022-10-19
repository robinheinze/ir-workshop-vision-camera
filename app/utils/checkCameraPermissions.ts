import { Alert } from "react-native"
import { Camera } from "react-native-vision-camera"

export const checkCameraPermission = async () => {
  let status = await Camera.getCameraPermissionStatus()
  if (status !== "authorized") {
    await Camera.requestCameraPermission()
    status = await Camera.getCameraPermissionStatus()
    if (status === "denied") {
      Alert.alert("You will not be able to scan if you do not allow camera access")
    }
  }
}
