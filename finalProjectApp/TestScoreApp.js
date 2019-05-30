import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, TouchableHighlight, TextInput, Image, ImageBackground, Button, Video, Audio, Alert, PanResponder, ScrollView, Linking } from 'react-native';
import { Constants } from 'expo';
import {createStackNavigator, createAppContainer, NavigationActions, StackActions, StackNavigator} from 'react-navigation';

var globalClassData = [[]]; //Global variable that will store the test score data obtained from the TestScoresScreen class in the app
var globalClassNames = [];

class LoadingClass extends Component {
  load(cb) {
    setTimeout(cb, 5000);
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
              onPress = {() => this.props.navigation.navigate('InstructionsPage')}
            >
              <Text style = {styles.buttonText}>
                View App Instructions
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
                source = {{uri: 'https://cdn.dribbble.com/users/1424774/screenshots/5445976/800x600.gif'}}
                style = {styles.loadingImage}
              />
          </View>
        </View>
      );
    }
  }
}

class InstructionsScreen extends Component { //Provides instruction for test scores screen (after home page and before test page).
  static navigationOptions = {
    title: 'Instructions Page',
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
            Welcome to the Instructions Screen!
          </Text>

          <Text style = {styles.questionTitle}>
            Make sure you use these steps when navigating the Test Scores Screen in Test Navigator:
          </Text>

          <Text style= {styles.testText}>
            1. When entering the grades for a certain class, put the class name in the text field and after every grade, select Add Score.
          </Text>

          <Text style = {styles.testText}>
            2. Add the weight for that specific class after computing the unweighted average (put 0 in text field if no weight is assigned). At this point, select Add Class Information to add the data associated with the current class to the test history.
          </Text>

          <Text style = {styles.testText}>
          3. Click Reset Score, make sure the text fields are empty, and repeat the process for Steps 1-2.
          </Text>

          <Text style = {styles.testText}>
          4. If necessary, at any point, click Erase Test History to remove your entire list of test scores/classes and start over.
          </Text>

          <Text style = {styles.testText}>
          5. Once you have finished, select Finish Test Scores at the far left and click the Analyze Test Data button to proceed in the app.
          </Text>

          <View style = {{flex: 1, alignItems: 'center'}}>
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
    else{
      return (
         <View style = {styles.loadingContainer}>
          <View style = {styles.loadingContainer}>
            <Text style = {styles.loadingText}> Loading Instructions Screen... </Text>
             <Image
                source = {{uri: 'https://cdn.dribbble.com/users/1424774/screenshots/5445976/800x600.gif'}}
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
    classNamesArray: [],
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
    this.setState({classData: this.state.classData + [[this.state.className,(1.0 * this.state.scoreTotal/this.state.scoreCount) + (this.state.classWeight * 10)]]}),
    this.setState({classIndex: this.state.classIndex + 1}),
    this.setState({classNamesArray: this.state.classNamesArray + [this.state.className]}) //Line for back-up array in case class names don't render properly in analysis stage
    console.log("/n");
  }

  finishScores = () => {
    this.setState({scoresFinished: true})
    globalClassData = this.state.classData; //The following line sets the global test data variable equal to the local state variable so that it can be accessed during the analysis stage.
    globalClassNames = this.state.classNamesArray;
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
                source = {{uri: 'https://cdn.dribbble.com/users/1424774/screenshots/5445976/800x600.gif'}}
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
    screenLoaded: false,
    maxGrade: 0,
    maxClassName: "",
    minGrade: 0,
    minClassName: ""
  }

  findMax = () => {
    let maxVal = globalClassData[0][1];
    let maxIndex = 0;
    for (let i = 0; i<globalClassData.length; i++){
        if (globalClassData[i][1]>maxVal){
          maxVal = globalClassData[i][1];
          maxIndex = i;
        }
    }
    this.setState({maxGrade: maxVal}),
    this.setState({maxClassName: globalClassNames[maxIndex]})
  }

  findMin = () => {
    let minVal = globalClassData[0][1];
    let minIndex= 0;
    for (let i = 0; i<globalClassData.length; i++){
        if (globalClassData[i][1]<minVal){
          minVal = globalClassData[i][1];
          minIndex = i;
        }
    }
    this.setState({minGrade: minVal}),
    this.setState({minClassName: globalClassNames[minIndex]})
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
        <Text style = {styles.title}>
          Welcome to the Analysis Screen!
        </Text>

        <Text style = {styles.analysisText}>
          {globalClassData}
        </Text>

        <TouchableHighlight
          onPress = {this.findMax}
        >
          <Text style = {styles.analysisText}>
            Maximum Grade: {this.state.maxGrade} in {this.state.maxClassName}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress = {this.findMin}
        >
          <Text style = {styles.analysisText}>
            Minimum Grade: {this.state.minGrade} in {this.state.minClassName}
          </Text>
        </TouchableHighlight>

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
                source = {{uri: 'https://cdn.dribbble.com/users/1424774/screenshots/5445976/800x600.gif'}}
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

        <Text style = {styles.testText}>
          Based on your performance from the analysis, Test Navigator recommends that you use these website to improve the following skills and academic retention:
        </Text>


          <Text style = {styles.recommendationText}>
            1. Khan Academy: Ideal to prepare for AP exams, SATs, ACTs, or conduct a general review of subjects using comprehensive problem review.
          </Text>


          <TouchableHighlight
          onPress={()=> Linking.openURL('https://www.khanacademy.org/')}
          >
            <Image
              style = {styles.websiteImage}
              source = {{uri: 'http://www.alvernoheightsacademy.org/wp-content/uploads/2017/05/Khan-Academy-logo.jpg'}}
            />
          </TouchableHighlight>

          <Text style = {styles.recommendationText}>
            2. Coursera: Provides advanced and specialized courses so that you become more familiar with careers in each subject and online learning.
          </Text>

          <TouchableHighlight
            onPress = {() => Linking.openURL('https://www.coursera.org/')}
          >
            <Image
              style = {styles.websiteImage}
              source = {{uri: 'https://i.pinimg.com/originals/f7/64/15/f76415d3d9779400d610a0f089f551e5.jpg'}}
            />
          </TouchableHighlight>


          <Text style = {styles.recommendationText}>
            3. EdX: Offers advanced courses related to certain fields within STEM such as computer science, business, engineering, biology, etc. to obtain industry expertise and career skills.
          </Text>

          <TouchableHighlight
            onPress = {() => Linking.openURL('https://www.edx.org/')}
          >
            <Image
              style = {styles.websiteImage}
              source = {{uri: 'http://techleaders.eg/wp-content/uploads/2016/11/ntl18.jpg'}}
            />
          </TouchableHighlight>

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
                source = {{uri: 'https://cdn.dribbble.com/users/1424774/screenshots/5445976/800x600.gif'}}
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
  websiteImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    imageAlign: 'center',
    marginLeft: 90,
  },
  recommendationText: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Calibri',
    marginBottom: 10,
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
    textAlign: 'center',
    marginBottom: 10,

  }

});


const AppNavigator = createStackNavigator({
  HomePage: {screen: HomeScreen},
  InstructionsPage: {screen: InstructionsScreen},
  TestPage: {screen: TestScoresScreen},
  AnalysisPage: {screen: AnalysisScreen},
  RecommendationPage: {screen: RecommendationScreen},
});

const TestScoresApp = createAppContainer(AppNavigator);

export default TestScoresApp;
