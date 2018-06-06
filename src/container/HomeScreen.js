import React, { Component } from 'react'
import {  
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from 'react-redux'
import { Actions } from "react-native-router-flux";
import { defaultSheet } from "../../assets/stylesheet/default";


class HomeScreen extends Component {

  
  _renderList = (array) => array.map((obj, index) => (
    <View key={index} >
      <Text>{obj.label}</Text>
      { this._renderButton(obj.list) }
    </View>
  ))

  _renderButton = (text, callback) => {
    return (
      <TouchableOpacity
        style={defaultSheet.button}
        onPress={() => {
          callback()
        }} >
        <Text>{text}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { name, profile_image_url, description } = this.props.user
    return (
      <View style={defaultSheet.container} >
        <View style={{ width: 100, height:100, borderRadius: 2, borderColor: 'black' }} >
        <Image source={{uri: profile_image_url}}
            style={{width: 100, height: 100}} />
        </View>
        <Text>Name: { name }</Text>
        <Text>Description: { description }</Text>
      </View>
    )
  }
}


const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)