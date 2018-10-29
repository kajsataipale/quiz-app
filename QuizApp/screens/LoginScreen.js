import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  AsyncStorage
} from "react-native";
import Colors from "../constants/Colors";
import base from "../Config/base.js";
import HomeScreen from "./HomeScreen";
import SignUpLink from "../components/Links/SignUpLink/SignUpLink";
import ForgotPassword from "../components/Links/ForgotPassword/ForgotPassword";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: "",
      loggedin: "",
      username: ""
    };
    this.login = this.login.bind(this);
  }
  async login() {
    try {
      await base
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);

      this.setState({
        response: "Logged In!"
      });

      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 1500);
    } catch (error) {
      this.setState({
        response: error.toString()
      });
    }
  }

  // _storeUser(user) {
  //   AsyncStorage.setItem("person", JSON.stringify(user));
  // }

  render() {
    console.log(this.props.navigation);
    return (
      <View style={styles.container}>
        <Text>QUIZ!T</Text>
        <Text>Utmana dina vänner. Eller dig själv!</Text>
        <View>
          <TouchableWithoutFeedback style={styles.container}>
            <View>
              <TextInput
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                autoCapitalize="none"
                style={styles.input}
              />
              <TextInput
                placeholder="Lösenord"
                onChangeText={password => this.setState({ password })}
                autoCapitalize="none"
                secureTextEntry={true}
                style={styles.input}
              />

              <View>
                <ButtonComponent title="Logga in" onPress={this.login} />
              </View>
              <View>
                <Text style={styles.response}>{this.state.response}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <ForgotPassword navigation={this.props.navigation} />
        </View>
        <View style={styles.row}>
          <Text style={{ color: Colors.grey }}>Har du inget konto? </Text>
          <SignUpLink navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 15
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
  row: {
    flexDirection: "row"
  }
});
