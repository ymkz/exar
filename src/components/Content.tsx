import * as React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { range } from 'src/helpers'

interface Props {
  text: string
}

interface State {
  offset: number
}

class Content extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0
    }
  }

  componentDidMount() {
    setInterval(() => this.setState({ offset: this.state.offset + 0.2 }), 16)
  }

  render() {
    const { text } = this.props
    const { offset } = this.state

    return (
      <ScrollView style={styles.fullfilled} contentOffset={{ x: 0, y: offset }}>
        {range(5).map((_, index) => (
          <Text key={index} style={styles.text}>
            {text}
          </Text>
        ))}
      </ScrollView>
    )
  }
}

export default Content

const styles = StyleSheet.create({
  fullfilled: {
    flex: 1,
    padding: 16
  },
  text: {
    lineHeight: 20
  }
})
