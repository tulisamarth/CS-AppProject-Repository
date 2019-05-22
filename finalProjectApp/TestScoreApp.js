import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, TouchableHighlight, TextInput, Image, ImageBackground, Button, Video, Audio } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {

  state = {
    currentTestScore: 0.0,
    averageTestScore: 0.0,
    scoreCount: 0,
    className: "",
    classData: [[]],
  }

  calculateAverageScore = () => {
    this.setState({averageTestScore: parseFloat(this.state.averageTestScore)/this.state.scoreCount})
  }

  addClassData = () => {
    this.setState({classData: this.state.classData + [[this.state.className, this.state.averageTestScore]]})
  }

  resetScore = () => {
    this.setState({averageTestScore: 0}),
    this.setState({currentTestScore: 0}),
    this.setState({scoreCount: 0}),
    this.setState({className: ""})
  }

  inputScore = testScore => {
    this.setState({currentTestScore: parseInt(testScore, 10)})
  }

  inputClass = subjectName => {
    this.setState({className: subjectName})
  }

  addScore = () => {
    this.setState({averageTestScore: this.state.averageTestScore + this.state.currentTestScore})
    this.setState({scoreCount: this.state.scoreCount + 1})
  }

  render()
  {
    return(
      <View style = {styles.container}>
        <Text style = {styles.title}>
          Test Scores Average App
        </Text>

        <Text style = {styles.title}>
          What class are you entering your test scores for?
        </Text>

        <TextInput
          value = {this.state.className}
          onChangeText = {this.inputClass}
          style = {styles.textInputField}
        >
        </TextInput>

        <Text style = {styles.title}>
          What test score would you like to enter?
        </Text>

        <TextInput
          value = {this.state.currentTestScore}
          onChangeText = {this.inputScore}
          style = {styles.textInputField}
        >
        </TextInput>

          <View style = {styles.subContainer}>

            <TouchableHighlight
              style = {styles.button}
              onPress = {this.calculateAverageScore}
            >
              <Text style = {styles.buttonText}>
                Calculate Average Score
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style = {styles.button}
              onPress = {this.addScore}
            >
              <Text style = {styles.buttonText}>
                Add Score
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style = {styles.button}
              onPress = {this.resetScore}
            >
              <Text style = {styles.buttonText}>
                Reset Score
              </Text>
            </TouchableHighlight>

             <TouchableHighlight
              style = {styles.button}
              onPress = {this.addClassData}
            >
              <Text style = {styles.buttonText}>
                Add Class Information
              </Text>
            </TouchableHighlight>
          </View>

          <View style = {styles.subContainer}>

            <Text style = {styles.buttonText}>
              {this.state.averageTestScore}
            </Text>

            <Text style= {styles.testScoreText}>
              Test Score History:
            </Text>

            <Text style= {styles.testScoreText}>
              {this.state.classData}
            </Text>
          </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Calibri',
    marginBottom: 10
  },
  textInputField: {
    borderColor: 'yellow',
    borderWidth: 1,
    width: 100,
    height: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 140
  },
  button: {
    marginTop: 25,
    width: 80,
    height: 45,
    backgroundColor: 'white',
    alignItems: 'center' ,
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 10
  },
  buttonText: {
    fontFamily: 'Helvetica',
    fontColor: 'black',
    textAlign: 'center'
  },
  testScoreText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Arial',
    marginTop: 40,
    textAlign: 'center',
    marginBottom: 20
  }
});
