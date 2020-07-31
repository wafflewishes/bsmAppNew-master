import firebase from 'firebase';
import { View, Image } from 'react-native';
import { State } from 'react-native-gesture-handler';
import moment from 'moment';
import WeeklyButton from './WeeklyButton';
import Quote from './Quote';
import questions from '../assets/data/hanuman';

import Colors from '../constants/Colors';

require('firebase/firestore');

  firebase.initializeApp({  
      apiKey: "AIzaSyDBpLhEqqh7hcJHWwEd--gr9rHx4SxelpU",
  authDomain: "bsm-application-1580966372867.firebaseapp.com",
  databaseURL: "https://bsm-application-1580966372867.firebaseio.com",
  storageBucket: "bsm-application-1580966372867.appspot.com",
  projectId: "bsm-application-1580966372867",});
  


//connects to firebase, retrieves all the events, 
//returns EventList

//Future:   retrieve Trivia, returns TriviaList
//          retrieve Quote, returns QuoteList

const EventList = [];
const PastEventList = [];
const divider = ' , ';

const TriviaList = [];
const QuoteList = {};
const WeeklyList = [];

var key = 0;
var lastDate ='';
var lastPastDate ='';

const LOADLIMIT = 50;
const LOADLIMITPAST = 20;

const MediaDescriptions = [];





export async function getTotalEventCount(listName){
  var snapshot = await firebase.firestore()
  .collection(listName)
  .get()

  return snapshot.length;
}

export async function pastEvents(){
  var snapshot;

  if(lastPastDate != ''){
    snapshot = await firebase.firestore()
    .collection('APast Events')
    .orderBy('startDate', 'desc')
    .startAfter(lastPastDate)
    .limit(LOADLIMITPAST)
    .get()
  
  }
  else {
    snapshot = await firebase.firestore()
    .collection('APast Events')
    .orderBy('startDate', 'desc')
    .limit(LOADLIMITPAST)
    .get()
  }
  
  var shortList = [];

  snapshot.forEach((doc) => {
      var event = {};
      event.description = doc.get('description');

 
      
      event.title = doc.get('title');

       event.endTime = '';  
       event.startTime = ''; 

      event.expandable = new Boolean (doc.get('expandable'));  
     
      var thumbnail = doc.get('thumbnail');
      event.multimedia = [];
      if(thumbnail == '') event.thumbnail = require('../assets/images/appLogo.png');
      else if (thumbnail.includes(divider)){
        var multimedia = thumbnail.split(divider);
        multimedia.forEach((item) =>{
          event.multimedia.push({uri: item})
        })
        event.thumbnail = {uri: multimedia[0]}; 

      }
      else event.thumbnail = {uri: doc.get('thumbnail')}; 

      event.media = doc.get('media');
      event.baseStartDate=doc.get('startDate');

      event.RawStartDate = event.baseStartDate.seconds * 1000;
      event.startDate = moment(event.RawStartDate).format('YYYY-MM-DD');
      event.commonStartDate = moment(event.RawStartDate).format('MMMM Do, YYYY');

      event.baseEndDate=doc.get('endDate');

      event.RawEndDate = event.baseEndDate.seconds * 1000;
      if(event.baseEndDate != ''){
        event.endDate = moment(event.RawEndDate).format('YYYY-MM-DD');
        event.commonEndDate = moment(event.RawEndDate).format('MMMM Do, YYYY');
        event.period = moment(event.RawStartDate).format('MMM Do') + " - " + moment(event.RawEndDate).format('MMM Do');
      }
      else event.period = event.commonStartDate;

      event.key = (event.title+event.startDate);


      event.type = doc.get('type');  

      switch(event.type){
        case 'Special':
          event.color = Colors.special
          break;
        case 'Monthly':
          event.color = Colors.monthly
          break;
        case 'Community':
          event.color = Colors.community
          break;
        default:
          event.color = Colors.base
          break;
      }

      event.status = 'past';
      if(event.endDate >= moment().format('YYYY-MM-DD')){
        event.status = 'ongoing';
        WeeklyList.push(event);
      }
     
      if(!event.RawStartDate == "" && PastEventList.filter(e => e.key == event.key).length == 0){


        PastEventList.push(event);
        shortList.push(event);
        EventList.push(event);

        key++;
        lastPastDate=event.baseStartDate;
      }
    
  });
  console.log(PastEventList[0])
  return shortList;
}


function loadWeekly(){
  

  var event={};
  var day = moment().day();
  switch(day){
    case 0:
      event = {
        key: 'Sunday Morning Service'+ moment().format('YYYY-MM-DD'),
        title: 'Sunday Morning Service',
        description: 'Begin your week in spirituality',
        endTime: '12:30',
        multimedia: [],
        startTime: '9:30',
        expandable: new Boolean('false'),
        thumbnail: require('../assets/images/shivaparvati.jpg'),
        RawStartDate: moment().unix(),
        startDate: moment().format('YYYY-MM-DD'),
        commonStartDate: moment().format('MMMM Do, YYYY'),
        RawEndDate: "",
        endDate: "",
        type: "weekly",
        commonEndDate: "",
        status: "today",
        period: moment('09:30', "hh:mm").fromNow()
      };
      break;
     case 1:
      event = {
        key: 'Shiva Puja'+ moment().format('YYYY-MM-DD'),
        title: 'Shiva Puja',
        description: 'We offer special puja to the lingam, and sing the praises of bhagwan Shiva.',
        endTime: '20:00',
        startTime: '18:30',
        multimedia: [],

        expandable: new Boolean('false'),
        thumbnail: require('../assets/images/lingam.jpg'),
        RawStartDate: moment().unix(),
        startDate: moment().format('YYYY-MM-DD'),
        commonStartDate: moment().format('MMMM Do, YYYY'),
        RawEndDate: "",
        endDate: "",
        type: "weekly",
        commonEndDate: "",
        status: "today",
        period: moment('18:30', "hh:mm").fromNow()

      };
      break;
 case 2:
      event = {
        key: 'Hanuman Puja'+ moment().format('YYYY-MM-DD'),
        title: 'Hanuman Puja',
        description: 'We offer special puja to Hanumanji, and chant the Hanumanji Chalisa.',
        endTime: '20:00',
        multimedia: [],

        startTime: '18:30',
        expandable: new Boolean('false'),
        thumbnail: require('../assets/images/hanuman.jpg'),
        RawStartDate: moment().unix(),
        startDate: moment().format('YYYY-MM-DD'),
        commonStartDate: moment().format('MMMM Do, YYYY'),
        RawEndDate: "",
        endDate: "",
        type: "weekly",
        commonEndDate: "",
        status: "today",
        period: moment('18:30', "hh:mm").fromNow()

      };
      break;
 case 5:
      event = {
        key: 'Devi Puja'+ moment().format('YYYY-MM-DD'),
        title: 'Devi Puja',
        description: 'We offer special puja to Maa Durga, Maa Saraswatti, and Mata lakshmi on this day.',
        endTime: '20:00',
        multimedia: [],

        startTime: '18:30',
        expandable: new Boolean('false'),
        thumbnail: require('../assets/images/durga.jpg'),
        RawStartDate: moment().unix(),
        startDate: moment().format('YYYY-MM-DD'),
        commonStartDate: moment().format('MMMM Do, YYYY'),
        RawEndDate: "",
        endDate: "",
        type: "weekly",
        commonEndDate: "",
        status: "today",
        period: moment('18:30', "hh:mm").fromNow()

      };
      break;
    
  }


  if(event != {}){
    if(WeeklyList.filter(e => e.key === event.key) == 0) WeeklyList.push(event);
  }
  if(WeeklyList.filter(e => e.key === 'Aarti'+ moment().format('YYYY-MM-DD')).length == 0){
    WeeklyList.push({
      key: 'Aarti'+ moment().format('YYYY-MM-DD'),
      title: 'Aarti',
      description: 'We conclude the day with Aarti at 8:00pm.',
      endTime: '',
      multimedia: [],

      startTime: '20:00',
      expandable: new Boolean('false'),
      thumbnail: {uri: "https://static.wixstatic.com/media/28e3bd_b98b6dbd6893467a8930e473b0a7756a~mv2.png"},
      RawStartDate: moment().format(),
      startDate: moment().format('YYYY-MM-DD'),
      commonStartDate: moment().format('MMMM Do, YYYY'),
      RawEndDate: "",
      endDate: "",
      type: "daily",
      commonEndDate: "",
      status: "today",
      period: moment('20:00', "hh:mm").fromNow()

    });
  }

}
export async function getLivestream(collection){
  var snapshot = await firebase.firestore()
  .collection('Media')
  .doc('Livestream')
  .collection(collection)
  .orderBy('key','desc') 
  .limit(1)
  .get()

  var obj;
  snapshot.forEach((doc) => {
    item = {};
    item.title = doc.get('title');
    item.key = doc.get('key');
    item.thumbnail = doc.get('thumbnail');
    item.description = doc.get('description');
    item.link = doc.get('link');

    item.date = doc.get('date');
    var date = item.date.split(' at ');
    item.date = moment(date[0], 'MMMM Do, YYYY').format('MMMM Do, YYYY');
    obj = item;
  })
  console.log(obj);
  return obj;
}

export async function getPodcast(collection){
  var snapshot = await firebase.firestore()
  .collection('Media')
  .doc('Podcasts')
  .collection(collection)
  .orderBy('date','desc') 
  .limit(1)
  .get()
  var obj;
  snapshot.forEach((doc) => {
    item = {};
    item.date = moment(doc.get('date'),'YYYY-MM-DD').format('MMMM Do, YYYY');
    item.id = doc.get('id');
    item.thumbnail = doc.get('thumbnail');
    item.title = doc.get('name');
    item.link = doc.get('link');
    obj = item;
  })
  return obj;
}

export async function getMusic(collection){
  var snapshot = await firebase.firestore()
  .collection('Media')
  .doc('Music')
  .collection(collection)
  .orderBy('date','desc') 
  .limit(1)
  .get()
  var obj;
  snapshot.forEach((doc) => {
    item = {};
    item.date = "added on: " + moment(doc.get('date'),'YYYY-MM-DD').format('MMMM Do, YYYY');
    item.id = doc.get('id');
    item.title = doc.get('name');
    item.link = doc.get('link');
    obj = item;
  })
  return obj;
}

export async function getVideo(collection){
  var snapshot = await firebase.firestore()
  .collection('Media')
  .doc('Videos')
  .collection(collection)
  .orderBy('date','desc') 
  .limit(1)
  .get()
  var obj;
  snapshot.forEach((doc) => {
    item = {};
    item.date = moment(doc.get('date')).format('MMMM Do, YYYY');
    item.id = doc.get('id');
    item.thumbnail = doc.get('thumbnail');
    item.title = doc.get('title');
    item.link = doc.get('link');
    obj = item;
  })
  return obj;
}





export async function getTrivia(){

    var snapshot = await firebase.firestore()
    .collection('Trivia')
    .orderBy('subject')
    .get()

    let subject = '';
    var set = [];

    snapshot.forEach((doc) => {
        if(subject == '') subject = doc.get('subject');
        
        if(doc.get('subject') != subject){
          TriviaList.push([subject, set]);
          subject = doc.get('subject');
          set = [];
        }

          var questions = {};
          questions.question = doc.get('question');
          questions.answers = [];
          
          if(questions.question != ""){
            let answers = [doc.get('answer').toString(), doc.get('c1').toString()];
            if(doc.get('c2').toString() != '') answers.push(doc.get('c2').toString());
            if(doc.get('c3').toString() != '') answers.push(doc.get('c3').toString());



            shuffleArray(answers);
            answers.forEach((obj) => {
              if(obj == doc.get('answer').toString()){
                questions.answers.push({ id: answers.indexOf(obj) + 1, text: obj, correct: true})
              }
              else{
                questions.answers.push({ id: answers.indexOf(obj) + 1, text: obj})
              }

            });
            set.push(questions);

          }
         

        
    });

    TriviaList.push([subject, set]);

}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export async function getQuotes(){

    var snapshot = await firebase.firestore()
    .collection('Quotes')
    .get()

    QuoteList.Morning = [];
    QuoteList.Afternoon = [];
    QuoteList.Night = [];

    snapshot.forEach((doc) => {
      if(doc.get('quote').length >= 20)
        var tod = doc.get('timeOfDay')
        switch(tod){
          case 'Morning':
            QuoteList.Morning.push(doc.data());
            break;
          case 'Afternoon':
            QuoteList.Afternoon.push(doc.data());
            break;
          case 'Night':
            QuoteList.Night.push(doc.data());
            break;
          default:
            QuoteList.Afternoon.push(doc.data());
            break;
        }
    });


}


export async function loadMoreEvents(){

  var snapshot;
  
  if(lastDate != '')
  snapshot = await firebase.firestore()
  .collection('AEvents')
  .where('startDate', '>=', new Date(moment().format('YYYY-MM-DD')))
  .orderBy('startDate')
  .startAfter(lastDate)
  .limit(LOADLIMIT)
  .get()
  else {
    snapshot = await firebase.firestore()
  .collection('AEvents')
  .where('startDate', '>=', new Date(moment().format('YYYY-MM-DD')))
  .orderBy('startDate')
  .limit(LOADLIMIT)
  .get()

  loadWeekly();

  } 
  snapshot.forEach((doc) => {
    var event = {};
    
   
    event.title = doc.get('title');
    event.description = doc.get('description');
    if(doc.get('endTime') == "") event.endTime = '';
    else event.endTime = moment(doc.get('endTime').seconds * 1000).format('H:mm');  
    if(doc.get('startTime') == "") event.startTime = '';
    else event.startTime = moment(doc.get('startTime').seconds * 1000).format('H:mm');  
    event.expandable = new Boolean (doc.get('expandable'));  

    var thumbnail = doc.get('thumbnail');
      event.multimedia = [];
      if(thumbnail == '') event.thumbnail = require('../assets/images/appLogo.png');
      else if (thumbnail.includes(divider)){
        var multimedia = thumbnail.split(divider);
        multimedia.forEach((item) =>{
          event.multimedia.push({uri: item})
        })
        event.thumbnail = {uri: multimedia[0]}; 
      }
      else event.thumbnail = {uri: doc.get('thumbnail')}; 

    event.media = doc.get('media');

    event.baseStartDate=doc.get('startDate');

    event.RawStartDate = doc.get('startDate').seconds * 1000;
    event.startDate = moment(event.RawStartDate).format('YYYY-MM-DD');
    event.commonStartDate = moment(event.RawStartDate).format('MMMM Do, YYYY');

    event.baseEndDate=doc.get('endDate');

    event.RawEndDate = event.baseEndDate.seconds * 1000;
    if(event.baseEndDate != ''){
      event.endDate = moment(event.RawEndDate).format('YYYY-MM-DD');
      event.commonEndDate = moment(event.RawEndDate).format('MMMM Do, YYYY');
      event.period = moment(event.RawStartDate).format('MMM Do') + " - " + moment(event.RawEndDate).format('MMM Do');
    }
    else event.period = event.commonStartDate;

    event.key = (event.title+event.startDate);
    event.type = doc.get('type');  


    switch(event.type){
      case 'Special':
        event.color = Colors.special
        break;
      case 'Monthly':
        event.color = Colors.monthly
        break;
      case 'Community':
        event.color = Colors.community
        break;
      default:
        event.color = Colors.base
        break;
    }


    if(event.startDate >= moment().add(1,'day').format('YYYY-MM-DD')){
      event.status = 'future';
    }
    else if(event.startDate <= moment().subtract(1,'day').format('YYYY-MM-DD')){
      event.status = 'past';
    }
    else event.status = 'today';

    if(event.status == 'today'){
      WeeklyList.push(event);
    }

    if(!event.baseStartDate == "" && EventList.filter(e => e.key === event.key).length == 0){

      EventList.push(event);
      key++;
      lastDate=event.baseStartDate;

    }
});

}
  



export{EventList, TriviaList, QuoteList, WeeklyList, PastEventList};

