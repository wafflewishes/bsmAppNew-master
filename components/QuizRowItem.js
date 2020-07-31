import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {RowItem} from './RowItem';
import { useNavigation } from '@react-navigation/native';
import {TriviaList} from './firebaseAuth';

import vishnuLakshmiQuestions from "../assets/data/vishnuLakshmi";
import ramayanQuestions from "../assets/data/ramayan";
import hanumanQuestions from "../assets/data/hanuman";
import shivaQuestions from "../assets/data/shiva";
import generalQuestions from "../assets/data/general";
import  Colors  from "../constants/Colors";




export default function QuizRowItem(props){
    const navigation = useNavigation();
    var loadedQuiz = {};
    var RandomNumber = props.seed;
    var color;
    var image;

    switch(TriviaList[RandomNumber][0]){
        case 'hanuman':
                color = "#d63729";
                img = require('../assets/images/hanuman.jpg')
            break;
        case 'ram':
                color = "#f29421"
                img = require('../assets/images/ram.jpg')

            break;
        case 'scripture':
                color = "#d8a031"
                img = require('../assets/images/kalash.jpg')

            break;
        case 'vishnu':
                color = "#299ad6"
                img = require('../assets/images/kalash.jpg')

            break;
        case 'krishna':
                color = "#299ad6"
                img = require('../assets/images/kalash.jpg')

            break;
        case 'devi':
                color = "#9f1e1e"
                img = require('../assets/images/durga.jpg')


            break;
        case 'shiva':
                color = "#2250b4"
                img = require('../assets/images/lingam.jpg')


            break;    
    
        default:
                color = Colors.header;
                img = require('../assets/images/appLogo.png')

            break;        
                    
    }

    function capital(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    loadedQuiz = {
        title: 'Trivia: ' + capital(TriviaList[RandomNumber][0]),
        questions: TriviaList[RandomNumber][1],
        color: color,
        image: img,
    }

    return(
        <RowItem
        name={loadedQuiz.title}
        color={loadedQuiz.color}
        image={loadedQuiz.image}
        onPress={() => {navigation.navigate("Quiz", loadedQuiz)}
          
        }
      />
    );
}