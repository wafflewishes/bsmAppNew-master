import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { Button, ButtonContainer } from "../components/Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600",
    fontFamily: 'textFont-bold'
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"


  }
});

const styles2 = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.13
  },

});

class Quiz extends React.Component {

  state = {
    correctCount: 0,
    totalCount: this.props.route.params.questions.length,
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false
  };

  answer = correct => {
    this.setState(
      state => {
        const nextState = { answered: true };

        if (correct) {
          nextState.correctCount = state.correctCount + 1;
          nextState.answerCorrect = true;
        } else {
          nextState.answerCorrect = false;
        }

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 1000);


      }
    );
  };

  nextQuestion = () => {
    this.setState(state => {
      const nextIndex = state.activeQuestionIndex + 1;

      if (nextIndex >= state.totalCount) {
        return this.props.navigation.popToTop();
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };

  render() {
    const questions = this.props.route.params.questions;
    const question = questions[this.state.activeQuestionIndex];


    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.route.params.color }
        ]}
      >
        <ImageBackground
          style={styles2.backgroundImage}
          source={this.props.route.params.image}
        />
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            <Text style={styles.text}>{question.question}</Text>

            <ButtonContainer>
              {question.answers.map(answer => (
                <Button
                  key={answer.id}
                  text={answer.text}
                  onPress={() => this.answer(answer.correct)}
                  style={{
                    backgroundColor:
                      this.state.answered
                        ? answer.correct
                          ? "#5ed95e"
                          : "#ff6f61"
                        : "rgba(255,255, 255,0.4)"
                      
                  }}
                />

              ))}
            </ButtonContainer>
          </View>


          <Text style={styles.text}>
            {`${this.state.correctCount}/${this.state.totalCount}`}
          </Text>
        </SafeAreaView>

      </View>
    );
  }
}

export default Quiz;