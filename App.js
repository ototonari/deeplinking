import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Linking } from 'react-native';
import Expo from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      link: '',
      params: ''
    }
  }

  async componentDidMount() {
    // コンポーネント描画後にリスナーを登録する。
    // こちらはアプリが既に起動されていてdeeplinkの情報を取得したい場合
    Linking.addEventListener('url', this._callback)

    // こちらはアプリが未起動で、deeplinkによってアプリが起動された場合に、その情報を取得する場合
    this._getParams()
  }

  _callback(value) {
    console.warn(value)
  }

  async _getParams() {
    // Deeplinkによってアプリが起動した場合、そのリンク情報を取得する。
    const result = await Expo.Linking.parseInitialURLAsync()
    console.warn(result)
  }

  _renderButton = (label, callback) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (callback) {
          callback()
        }
      }} >
      <Text>{label}</Text>
    </TouchableOpacity>
  )


  render() {
    // 取得するタイミングは任意で可能
    const showParams = async () => {
      const result = await Expo.Linking.parseInitialURLAsync()
      console.warn(result)
      this.setState({ params: JSON.stringify(result)})
    }

    // callbackのリダイレクト先のdeeplinkを生成する。
    const makeUrl = () => {
      // callback元のpath
      const path = 'https://qpit.herokuapp.com/auth/twitter' // Maybe
      // アプリに渡したいクエリー情報を定義する
      const queryParams = {
        hoge: 'bar'
      }
      // Browser からアプリにリダイレクトする為のLink
      const deeplink = Expo.Linking.makeUrl(path, queryParams)
      console.warn("deeplink: ", deeplink)
      this.setState({ link: deeplink })
    }

    return (
      <View style={styles.container}>
        <Text>生成された値はコピペ可能</Text>
        <Text>Link:</Text>
        <Text selectable={true} >{ this.state.link }</Text>
        <Text></Text>
        <Text>Params:</Text>
        <Text selectable={true} >{ this.state.params }</Text>
        { this._renderButton('show params', () => showParams() ) }
        { this._renderButton('make deeplink', () => makeUrl() ) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#009FE8',
    padding: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    height: 30,
  },

});
