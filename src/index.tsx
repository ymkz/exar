import { AppLoading, Camera, Permissions, ScreenOrientation } from 'expo'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Content from 'src/components/Content'
import { text } from 'src/constants'

interface State {
  hasCameraPermission: boolean
}

class App extends React.PureComponent<{}, State> {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null
    }
  }

  async componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  render() {
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <AppLoading />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={styles.container}>
          <Camera style={styles.fullfilled} type={Camera.Constants.Type.back} />
          <Content text={text} />
        </View>
      )
    }
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  fullfilled: {
    flex: 1
  }
})
