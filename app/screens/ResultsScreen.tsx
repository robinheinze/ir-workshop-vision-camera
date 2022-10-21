import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { PhotoFile } from "react-native-vision-camera"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Results: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Results" component={ResultsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ResultsScreen: FC<StackScreenProps<AppStackScreenProps, "Results">> = observer(
  function ResultsScreen(props) {
    const { results } = props.route.params
    console.log(results.photo.path)
    return (
      <Screen style={$root} preset="scroll">
        {results.photo && (
          <Image
            source={{ uri: `file://${results.photo.path}` }}
            style={{ height: 600, width: 400 }}
          />
        )}
        {results.code && <Text text={results.code} />}
        {results.text && <Text text={results.text} />}
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
