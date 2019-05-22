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
    classIndex: 0,
    resetValues: false,
    completeTestHistory: ""
  }

  calculateAverageScore = () => {
    this.setState({averageTestScore: parseFloat(this.state.averageTestScore)/this.state.scoreCount})
    this.setState({classIndex: this.state.classIndex + 1})
  }

  finishScores = testsFinished => {
    this.setState({completeTestHistory: testsFinished})
  }

  addClassData = () => {
    this.setState({classData: this.state.classData + [[this.state.className, this.state.averageTestScore]]})
    console.log("/n")
  }

  resetScore = () => {
    this.setState({averageTestScore: 0}),
    this.setState({currentTestScore: 0}),
    this.setState({scoreCount: 0}),
    this.setState({className: ""})
    this.setState({resetValues: true})
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

        <Text style = {styles.questionTitle}>
          What class are you entering your test scores for?
        </Text>

        <TextInput
          value = {this.state.className}
          onChangeText = {this.inputClass}
          style = {styles.textInputField}
        >
        </TextInput>

        <Text style = {styles.questionTitle}>
          What test score would you like to enter?
        </Text>

        <TextInput
          value = {this.state.currentTestScore}
          onChangeText = {this.inputScore}
          style = {styles.textInputField}
        >
        </TextInput>

        <Text style = {styles.questionTitle}>
          Are you finished with your testing score history? (Answer Yes when complete.)
        </Text>

        <TextInput
          value = {this.state.completeTestHistory}
          onChangeText = {this.finishScores}
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

          <View style = {styles.buttonText}>

            <Text style = {styles.testText}>
              Average Test Score for {this.state.className}-> {this.state.averageTestScore}
            </Text>
          </View>

          <Text style= {styles.testText}>
              Test Score History:
          </Text>

          <Text style = {styles.scoreDataText}>
            Subject and Test Score {this.state.classIndex}: {this.state.classData}
          </Text>
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
    fontSize: 20,
    fontFamily: 'Calibri',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  questionTitle: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Calibri',
    marginBottom: 10,
    fontWeight: 'bold'
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
    textAlign: 'center',
    marginTop: 10
  },
  testText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Arial',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  scoreDataText: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Arial',
    color: 'yellow',
    textAlign: 'center',
  }

});
