import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, TouchableHighlight, TextInput, Image, ImageBackground, Button, Video, Audio, Alert, PanResponder, ScrollView } from 'react-native';
import { Constants } from 'expo';
import {createStackNavigator, createAppContainer, NavigationActions, StackActions, StackNavigator} from 'react-navigation';

class LoadingClass extends Component {
  load(cb) {
    setTimeout(cb, 4000);
  }
}


class HomeScreen extends Component { //Home Screen of App.
  state = {
    screenLoaded: false,
  }

  static navigationOptions = {
    title: 'Home Page'
  }

  constructor() {
    super();
    var loader = new LoadingClass();
    loader.load(v => this.setState({screenLoaded: true}));
  }

  render() {
    if (this.state.screenLoaded === true)
    {
    return (
      <ScrollView>
        <View style = {styles.container}>
          <Text style = {styles.appTitle}>
            Test Scores Navigator
          </Text>
          <Text style = {styles.title}>
            Welcome to the Home Screen!
          </Text>

          <View style = {{flex: 1, alignItems: 'center'}}>
            <TouchableHighlight
              onPress = {() => Alert.alert("Test Navigator Mission: We desire to provide you an effective way to compute your test scores and compare them against national statistics.")}
            >
              <Image
                source = {{uri: 'https://dwtyzx6upklss.cloudfront.net/Pictures/2000x2000fit/2/8/5/5285_marketmapeducationlogo_45714.png'}}
                style = {styles.appLogo}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style = {styles.introButton}
              onPress = {() => this.props.navigation.navigate('TestPage')}
            >
              <Text style = {styles.buttonText}>
                Enter Test Score Data
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
    }
    else
    {
      return (
         <View style = {styles.loadingContainer}>
          <View style = {styles.loadingContainer}>
            <Text style = {styles.loadingText}> Loading Home Screen... </Text>
             <Image
                source = {{uri: 'https://i.imgur.com/gVX3yPJ.gif'}}
                style = {styles.loadingImage}
              />
          </View>
        </View>
      );
    }
  }
}

class TestScoresScreen extends Component{ //2nd screen of app which collects test score data.
  static navigationOptions = {
    title: 'Test Scores Page',
  }

  constructor() {
    super();
    var loader = new LoadingClass();
    loader.load(v => this.setState({screenLoaded: true}));
  }


  state = {
    currentTestScore: 0.0,
    scoreTotal: 0.0,
    averageTestScore: 0.0,
    scoreCount: 0.0,
    className: "",
    classData: [[]],
    classIndex: 0,
    classWeight: 0.0,
    scoresFinished: false,
    screenLoaded: false
  }

  /*
  renderLine = (className, avg) => {
    return(
    <View style = {styles.subContainer}>
      <Text style = {styles.scoreDataText}>
        Class: {className}, Average Score: {avg}
        {"\n"}
      </Text>
    </View>
    );
  }

  renderScores = () => {
    for (var i = 0; i<this.state.classData.length; i++){
      {this.renderLine(this.state.classData[i][0], this.state.classData[i][1])}
    }
  }
  */

  addClassData = () => {
    this.setState({classData: this.state.classData + [[this.state.className, (1.0 * this.state.scoreTotal/this.state.scoreCount) + (this.state.classWeight * 10)]]}),
    this.setState({classIndex: this.state.classIndex + 1})
    console.log("/n");
  }

  finishScores = () => {
    this.setState({scoresFinished: true})
    //{this.renderScores}
  }

  resetScore = () => {
    this.setState({averageTestScore: 0}),
    this.setState({currentTestScore: 0}),
    this.setState({scoreCount: 0}),
    this.setState({className: ""}),
    this.setState({scoreTotal: 0}),
    this.setState({classWeight: 0.0})
  }

  eraseHistory = () => {
    this.setState({classData: [[]]}),
    this.setState({classIndex: 0})
  }

  calculateAverageScore = () => {
     this.setState({averageTestScore: parseFloat(this.state.scoreTotal)/this.state.scoreCount}),
     this.setState({classIndex: this.state.classIndex + 1})
  }

  inputClass = subjectName => {
    this.setState({className: subjectName})
  }

  inputScore= testScore => {
    this.setState({currentTestScore: parseInt(testScore, 10)})
  }

  inputClassWeight = weight => {
    this.setState({classWeight: parseFloat(weight, 10)})
  }

  addScore = () => {
    this.setState({scoreTotal: this.state.scoreTotal*1.0+this.state.currentTestScore*1.0}),
    this.setState({scoreCount: this.state.scoreCount*1.0 + 1.0}),
    this.setState({averageTestScore: parseFloat(this.state.scoreTotal)/this.state.scoreCount})
  }



  render()
  {
    if (this.state.screenLoaded === true)
    {
    return (
      <ScrollView>
      <View style = {styles.container}>
        <Text style = {styles.title}>
          Welcome to the test scores screen!
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
          What is the associated weight for this class?
        </Text>

        <TextInput
          value = {this.state.classWeight}
          style = {styles.textInputField}
          onChangeText = {this.inputClassWeight}
        >
        </TextInput>


         <View style = {styles.subContainer}>
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

            <TouchableHighlight
              style = {styles.button}
              onPress = {this.eraseHistory}
            >
              <Text style = {styles.buttonText}>
                Erase Test History
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style = {styles.button}
              onPress = {this.finishScores}
            >
              <Text style = {styles.buttonText}>
                Finish Class Scores
              </Text>
            </TouchableHighlight>
          </View>


         <View style = {styles.subContainer}>
            <Text style = {styles.testText}>
              Average Test Score for {this.state.className}-> {this.state.scoreTotal/this.state.scoreCount}
            </Text>
          </View>
        <View style = {styles.subContainer}>
            <Text style = {styles.testText}>
              Test Count: {this.state.scoreCount}, Total Score: {this.state.scoreTotal}
            </Text>
          </View>

          <Text style= {styles.testText}>
              Class History with Names and Average Scores:
          </Text>

          <Text style = {styles.scoreDataText}>
            Subject {this.state.classIndex}: {this.state.className}, Weighted Average Score: {1.0 *(this.state.scoreTotal/this.state.scoreCount) + (this.state.classWeight * 10)}
            {'\n'}
          </Text>

          <Text style = {styles.scoreDataText}>
            {this.state.classData}
          </Text>

          <View style = {styles.subContainer}>
            <TouchableHighlight
              style = {styles.analysisButton}
              onPress = {() => this.props.navigation.navigate('AnalysisPage')}
            >
              <Text style = {styles.buttonText}>
                Analyze Your Test Score Data
              </Text>
            </TouchableHighlight>
          </View>

        </View>
        </ScrollView>
    );
    }
    else
    {
      return (
         <View style = {styles.loadingContainer}>
          <View style = {styles.loadingContainer}>
            <Text style = {styles.loadingText}> Loading Test Scores Screen... </Text>
             <Image
                source = {{uri: 'https://i.imgur.com/gVX3yPJ.gif'}}
                style = {styles.loadingImage}
              />
          </View>
        </View>
      );
    }
  }
}

class AnalysisScreen extends Component{
  static navigationOptions = {
    title: 'Analysis Page',
  }

  state = {
    testData: (new TestScoresScreen()).state.classData,
    screenLoaded: false,
  }

  constructor() {
    super();
    var loader = new LoadingClass();
    loader.load(v => this.setState({screenLoaded: true}));
    var analysisObj = new TestScoresScreen();
  }

  render() {
    if (this.state.screenLoaded === true)
    {
    return (
      <ScrollView>
      <View style = {styles.container}>
        <Text style = {styles.title}>
          Welcome to the Analysis Screen!

        </Text>

        <Text style = {styles.analysisText}>
          {this.state.testData}
        </Text>

        <View style = {styles.subContainer}>
          <TouchableHighlight
            style = {styles.analysisButton}
            onPress = {() => this.props.navigation.navigate('RecommendationPage')}
          >
            <Text style = {styles.buttonText}>
              View Your Test Recommendations
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      </ScrollView>
    );
    }
    else{
      return(
       <View style = {styles.loadingContainer}>
          <View style = {styles.loadingContainer}>
            <Text style = {styles.loadingText}> Analyzing Test Score Results... </Text>
             <Image
                source = {{uri: 'https://i.imgur.com/gVX3yPJ.gif'}}
                style = {styles.loadingImage}
              />
          </View>
        </View>
      );
    }
  }
}


class RecommendationScreen extends Component {
  static navigationOptions = {
    title: 'Recommendations Page',
  }

  state = {
    screenLoaded: false,
  }

  constructor() {
    super();
    var loader = new LoadingClass();
    loader.load(v => this.setState({screenLoaded: true}));
  }

  render() {
    if (this.state.screenLoaded === true){
    return (
      <ScrollView>
      <View style = {styles.container}>
        <Text style = {styles.title}>
          Welcome to the Recommendations Page!
        </Text>
      </View>
      </ScrollView>
    );
    }
    else{
      return (
        <View style = {styles.loadingContainer}>
          <View style = {styles.loadingContainer}>
            <Text style = {styles.loadingText}> Preparing Testing Recommendations... </Text>
             <Image
                source = {{uri: 'https://i.imgur.com/gVX3yPJ.gif'}}
                style = {styles.loadingImage}
              />
          </View>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    fontFamily: 'Franklin Gothlic',
    fontSize: 25,
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 30,
  },
  loadingImage: {
    marginTop: 20,
    width: 300,
    height: 300,
    alignItems: 'center',
    imageAlign: 'center',
    marginLeft: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  appTitle: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Calibri',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  appLogo: {
    marginTop: 20,
    width: 300,
    height: 300,
    alignItems: 'center',
    imageAlign: 'center'
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  title: {
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
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
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
    height: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 140
  },
  introButton: {
    marginTop: 25,
    width: 200,
    height: 45,
    backgroundColor: 'white',
    alignItems: 'center' ,
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  button: {
    marginTop: 25,
    width: 55,
    height: 45,
    backgroundColor: 'white',
    alignItems: 'center' ,
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  analysisButton: {
    width: 260,
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center' ,
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonText: {
    fontFamily: 'Helvetica',
    fontColor: 'black',
    textAlign: 'center',
    marginTop: 10
  },
  testText: {
    fontSize: 15,
    color: 'blue',
    fontFamily: 'Arial',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  scoreDataText: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Arial',
    color: 'black',
    textAlign: 'center',
  },
  analysisText: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    textAlign: 'center'
  }

});


const AppNavigator = createStackNavigator({
  HomePage: {screen: HomeScreen},
  TestPage: {screen: TestScoresScreen},
  AnalysisPage: {screen: AnalysisScreen},
  RecommendationPage: {screen: RecommendationScreen},
});

const TestScoresApp = createAppContainer(AppNavigator);

export default TestScoresApp;
