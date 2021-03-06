import React from "react";
import { WebBrowser } from "expo";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  View
} from "react-native";
import * as Elements from "react-native-elements";
import base from "../Config/base.js";
import Colors from "../constants/Colors";
import Headline from "../components/Headline/Headline";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";
import Logout from "../components/Logout/Logout";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: "",
      photoUrl: "",
      username: "",
      emailVerified: "",
      uid: "",
      loggedin: ""
    };
    this.getuser = this.getuser.bind(this);
  }
  componentDidMount() {
    this.getuser();
  }
  getuser = () => {
    var user = base.auth().currentUser;
    if (user != null) {
      this.setState({
        emailVerified: user.emailVerified,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
        username: user.username,
        loggedin: user.loggedin,
        secureText: true
      });
    }
  };

  changePassword = () => {
    base
      .auth()
      .currentUser.updatePassword(this.state.password)
      .then(function() {
        console.log("update");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Headline headline="Dina inställningar" />
        <View style={styles.containerInner}>
          <Text>
            Ändra lösenord för användare med e-post: {this.state.email}
          </Text>
          <Text>
            {this.state.photoURL}
            {this.state.username}
          </Text>
          <TouchableWithoutFeedback>
            <TextInput
              placeholder="Nytt lösenord"
              secureTextEntry={this.state.secureText}
              onChangeText={password => this.setState({ password })}
              autoCapitalize="none"
              style={styles.input}
            />
          </TouchableWithoutFeedback>
          <ButtonComponent
            title="Ändra lösenord"
            onPress={this.changePassword}
          />
          <Logout navigation={this.props.navigation} style={styles.logout} />
        </View>
        <View style={styles.version}>
          <Text style={styles.versionText}>Quiz!t 2018</Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.white
  },
  containerInner: {
    alignItems: "center",
    marginTop: 40
  },
  input: {
    height: 50,
    width: 304,
    borderRadius: 25,
    backgroundColor: Colors.bgWhite,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20
  },
  scorecontainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    height: "auto",
    width: 300,
    borderRadius: 8,
    justifyContent: "space-around",
    backgroundColor: "white"
  },
  chartcontainer: {},
  headline: {
    marginVertical: 10
  },
  paragraph: {
    fontSize: 18
  },

  version: {
    position: "absolute",
    bottom: 5,
    alignSelf: "center"
  },
  versionText: {
    fontSize: 12,
    textAlign: "center"
  }
});
