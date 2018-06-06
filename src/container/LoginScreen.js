import React, { Component } from 'react'
import {  
  Alert,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'
import { Actions } from "react-native-router-flux";
import { defaultSheet } from "../../assets/stylesheet/default";

/* import twitter */
import twitter, { TWLoginButton, decodeHTMLEntities, getRelativeTime } from 'react-native-simple-twitter'
import { Constants } from 'expo'

// actions
import { tokenSet, userSet } from "../actions/index";

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false,
      authUrl: null
    }

    console.log(decodeHTMLEntities("&amp; &apos; &#x27; &#x2F; &#39; &#47; &lt; &gt; &nbsp; &quot;"))
    console.log(getRelativeTime(new Date(new Date().getTime() - 32390)))
    console.log(getRelativeTime("Thu Apr 06 15:28:43 +0000 2017"))
  }

  async componentWillMount() {
    if (this.props.user.token) {
      twitter.setAccessToken(this.props.user.token, this.props.user.token_secret)

      try {
        const user = await twitter.get("account/verify_credentials.json", { include_entities: false, skip_status: true, include_email: true })
        this.props.dispatch({ type: "USER_SET", user: user })

        this.props.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' })
          ]
        }))
      } catch (err) {
        console.log(err)
      }
    }
  }

  onGetAccessToken = ({ oauth_token, oauth_token_secret }) => {
    this.props.tokenSet({ oauth_token, oauth_token_secret })
  }
  // onGetAccessToken = ({ oauth_token, oauth_token_secret }) => {
  //   this.props.dispatch({ type: "TOKEN_SET", token: oauth_token, token_secret: oauth_token_secret })
  // }

  onSuccess = (user) => {
    this.props.userSet(user)
    //this.props.dispatch({ type: "USER_SET", user: user })

    Alert.alert(
      "Success",
      "ログインできました",
      [
        {
          text: 'Go HomeScreen',
          onPress: () => {
            Actions.push("HomeScreen")
          }
        }
      ]
    )
  }

  onPress = (e) => {
    console.log("button pressed")
  }

  onClose = (e) => {
    console.log("press close button")
  }

  onError = (err) => {
    console.log(err)
  }

  
  render() {
    return (
      <View style={defaultSheet.container} >
        <Text></Text>
        <TWLoginButton
          style={{ width: "100%", height: 60 }}
          type="TouchableOpacity"
          onPress={this.onPress}
          onGetAccessToken={this.onGetAccessToken}
          onSuccess={this.onSuccess}
          onClose={this.onClose}
          onError={this.onError}><Text style={{ textAlign: "center" }}>Twitterでログインする</Text></TWLoginButton>
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
    userSet: (user) => {
      dispatch(userSet(user))
    },
    tokenSet: ({ oauth_token, oauth_token_secret }) => {
      dispatch(tokenSet({ oauth_token, oauth_token_secret }))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)