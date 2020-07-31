import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground, Button , Animated} from 'react-native';
import { Calendar, CalendarList } from "react-native-calendars";
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import EventPage from './EventPage';
import Web from './Web';
import WeeklyButton from '../components/WeeklyButton';
import Week from './Week';
import { useNavigation } from '@react-navigation/native';

import Col from '../constants/Colors';

import moment from 'moment';
import { EventList, loadMoreEvents, Purnima, pastEvents, PastEventList, WeeklyList, } from '../components/firebaseAuth';

import Layout from '../constants/Layout';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MultipleEvents from './MultipleEvents';

import { MaterialIcons, } from '@expo/vector-icons';
import PastEventsFeed from './PastEventsFeed';

const CalendarStack = createStackNavigator();


const TODAY = moment().format();
var dates = [];
var weekly = {};
let mark = {};
var obj = [];
var markings = [];
var purnima = [];
var month;
var usedDates = [];

const DURATION = 350;

class LinksScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { items: {}, showLegend: false }
    this.loadCal = this.loadCal.bind(this);
    this.legend.bind(this);
    this.loadMonthEvents.bind(this);
    month = moment().month();
    this._animated = new Animated.Value(27);
    this._faded = new Animated.Value(0);



  }

  componentDidMount() {
    this.loadCal();

  }

  Animate = () => {
    if(!this.state.showLegend){
      //pulls up the legend
      Animated.sequence([
        Animated.timing(this._animated, {
          toValue: 125,
          duration: DURATION
        }),
        Animated.timing(this._faded,{
          toValue: 1,
          duration: DURATION/2
        })
      ]).start(() => this.setState({showLegend: !this.state.showLegend}));
    }
    else {
      //drops legend
      this.setState({showLegend: !this.state.showLegend});
      Animated.sequence([
        Animated.timing(this._faded,{
          toValue: 0,
          duration: DURATION/2
        }),
        Animated.timing(this._animated, {
          toValue: 27,
          duration: DURATION
        }),
       
      ]).start();
   }

  }



  loadCal = () => {
    dates.forEach(day => {
      mark[day] = { selected: true, marked: true };
    });

    EventList.forEach(element => {
      if ((element.status == 'past' && element.description.length > 0) || (element.status == 'future'))
        dates.push(element)
    },
    );

    obj = dates.reduce((c, v) => {
      var color = Col.base;
      if (v.type == 'Special') color = Col.special;
      else if (v.status == 'past') color = Col.past;
      else if (v.type == 'Monthly') color = Col.monthly;
      else if (v.type == 'Community') color = Col.community;
      usedDates.push(v.startDate);

      if (EventList.filter(e => e.startDate == v.startDate).length > 1) color = Col.multiple

      return Object.assign(c, { [v.startDate]: { selected: false, marked: true, disabled: false, dotColor: color } })
      //change selected to true, marked to true, and doColor to selectedColor,  if entire day is to be highlighted. also delete the day styling in theme section

    }, {});

    if (purnima.length > 0)
      this.setState({ items: Object.assign(obj, purnima) });

    else
      this.setState({ items: obj });

  }

  loadDate = day => {
    const navigation = this.props.navigation;

    var output = filterItems(EventList, day.dateString);
    console.log(output.length)

    if (output.length > 1) {
      navigation.navigate("MultipleEvents", { events: output, day: day, color: output[0].color });

    }
    else if (output.length == 1) {
      console.log(output[0]);
      if (output[0].status == 'ongoing') navigation.navigate("EventPage", { isHeader: false, event: output[0], day: day, color: output[0].color, title: 'Ongoing Event' });
      else if (output[0].status == 'past') navigation.navigate("EventPage", { isHeader: false, event: output[0], day: day, color: output[0].color, title: 'Past Event' });
      else if (output[0].status == 'future') navigation.navigate("EventPage", { isHeader: false, event: output[0], day: day, color: output[0].color, title: 'Upcoming Event' });
    }

  }

  loadMonthEvents = (date) => {
    var locD = new Date(date);
    var month = locD.getMonth() + 1;
    console.log(month);
    this.props.navigation.navigate("MultipleEvents", { events: EventList.filter(e => moment(e.startDate, 'YYYY-MM-DD').format('MM') == month), day: 'All ' + moment(month, 'MM').format('MMMM') + ' Events', color: Col.lightGold, isHeader: true });

  }

  setHeader = (year) => {
    this.props.navigation.setOptions({
      headerTitle: year,
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold'
      }
    })
  }

  legendBar = () => {
    var icon;
    if (this.state.showLegend){
      icon = 'arrow-drop-down';
    }
    else{
      icon = 'arrow-drop-up';
    }

    return (
      <View style={[{ height: 27, backgroundColor: Col.lightBlue }, styles.shadow]}>
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() =>  this.Animate() }>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={styles.legendTitle}>Legend </Text>
            <MaterialIcons
              name={icon}
              size={25}
              color='white'
            />
          </View>
        </TouchableOpacity>
      </View>

    );

  }

  renderLegendItems = () => {
    var legendItems = [
      {
        key: 0,
        label: 'No events Today',
        color: Col.today
      },
      {
        key: 1,
        label: 'Special',
        color: Col.special
      },
      {
        key: 2,
        label: 'Monthly',
        color: Col.monthly
      },
      {
        key: 3,
        label: 'Community',
        color: Col.community
      },
      {
        key: 4,
        label: 'Past',
        color: Col.past
      },
      {
        key: 5,
        label: 'Multiple events',
        color: Col.multiple
      },
    ]

    const fadeAnim = [{ justifyContent: 'center', flex: 5, flexWrap: 'wrap', alignItems: 'center', opacity: this._faded}]

    return(
      <Animated.View style={fadeAnim}>

      {legendItems.map((item) =>
        <View style={styles.legendItem} key={item.key}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>  -   {item.label}</Text>
        </View>)}

    </Animated.View>

    );
  }

  legend = () => {
    const animStyle = [{height: this._animated, backgroundColor:'white'}]
    return (
      <Animated.View style={animStyle}>
        {this.legendBar()}
        {this.renderLegendItems()}

      </Animated.View>
    );
  }

  render() {

    return (
      <View style={{ alignItems: 'stretch', height: '100%', }}>
        <View style={{ flex: 12 }}>
          <CalendarList
            markedDates={this.state.items}

            onVisibleMonthsChange={(months) => {
              if (months.length == 1) {
                if (months[0].month > month) {
                  loadMoreEvents();
                }
                else pastEvents();
                this.loadCal();
              }
              this.setHeader(months[months.length - 1].year);
            }}

            onDayPress={(day) => { this.loadDate(day) }}
            calendarWidth={Layout.window.width}
            pastScrollRange={3}
            futureScrollRange={6}
            current={TODAY}
            theme={customOptions}
            renderHeader={(date) => {
              return (
                <TouchableOpacity onPress={() => this.loadMonthEvents(date)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.monthStyle}>{moment((date.getMonth() + 1) + '-' + (date.getFullYear()), 'MM-YYYY').format('MMMM')}</Text>
                  <MaterialIcons
                    name='arrow-drop-down'
                    size={35}
                    color={Col.lightBlue}
                  />

                </TouchableOpacity>
              )
            }}

          />


        </View>
        {this.legend()}
      </View>
    );
  }
}

function isEventToday(){
  var eventsToday = WeeklyList.filter(e => e.type != 'weekly' && (e.status == 'today' || e.status == 'ongoing'));
  if(eventsToday.length >= 2) return Col.multiple;
  else if (eventsToday.length == 1) return eventsToday[0].color;
  else return Col.today;
}


var customOptions = {
  backgroundColor: Col.background,
  calendarBackground: Col.background,
  textSectionTitleColor: Col.textColor,
  selectedDayTextColor: Col.textColor,
  selectedDotColor: Col.lightGold,
  todayTextColor: Col.background,
  todayBackgroundColor: isEventToday(),
  dayTextColor: Col.textColor,
  selectedDayBackgroundColor: Col.lightGold,

  textDayFontWeight: 'bold',
  // textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 38,
  textDayHeaderFontSize: 15,

  'stylesheet.calendar.main': {
    container: {
      padding: 5,
    },


  },

  'stylesheet.dot': {
    dot: {
      width: 10,
      height: 10,
      marginTop: 1,
      borderRadius: 5,

    }
  }


}

function filterItems(arr, dayString) {
  return arr.filter(function (el) {
    return el.startDate == dayString || ( el.status == 'ongoing' && dayString <= el.endDate && dayString >= el.startDate);
  })
}


export default function CalendarStackScreen() {
  const navigation = useNavigation();

  return (
    <CalendarStack.Navigator initialRouteName='Calendar' screenOptions={Layout.headerScreenOptions}>
      <CalendarStack.Screen name="Calendar" component={LinksScreen} options={{
        headerLeft: () => (
          <TouchableOpacity style={[styles.monthEventsContainer, styles.buttonBorder]} onPress={() => navigation.navigate('Week', {})}
          >
            <Text numberOfLines={2} style={styles.monthEvents}>{"Weekly\nSchedule"}</Text>
          </TouchableOpacity>),
        headerRight: () => (
          <TouchableOpacity style={[styles.monthEventsContainer, styles.buttonBorder]} onPress={() => navigation.navigate('PastEvents', {})}
          >
            <Text numberOfLines={2} style={styles.monthEvents}>{"Past\nEvents"}</Text>
          </TouchableOpacity>),


      }} />
      <CalendarStack.Screen name="EventPage" component={EventPage} options={({ route }) => ({ title: route.params.title })} />
      <CalendarStack.Screen name="MultipleEvents" component={MultipleEvents} options={({ route }) => { if (!route.params.isHeader) return ({ title: moment(route.params.day.dateString).format('dddd, MMMM Do, YYYY') }); else return ({ title: route.params.day }); }} />
      <CalendarStack.Screen name="PastEvents" component={PastEventsFeed} options={{ title: 'Past Events' }} />
      <CalendarStack.Screen name="Web" component={Web} options={({ route }) => ({ title: route.params.item.title })} />

    </CalendarStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  legendItem: {
    flexDirection: 'row', alignItems: 'center', height: 30, width: 180, justifyContent: 'flex-start'
    , marginLeft: 10
  },

  shadow:{
    shadowOffset: {
      height: -3,
    },
    shadowColor: Col.header,
    shadowOpacity: 0.4,
  },

  monthStyle: {
    color: Col.today,
    fontWeight: 'bold',
    fontSize: 35
  },

  calendar: {
    height: 400,
  },
  legendTitle: {
    textAlign: 'center',
    fontFamily: 'textFont-bold',
    fontSize: 20,
    color: 'white'
  },
  title: {
    color: 'white',
    fontFamily: 'textFont-semiBold',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center'
  },
  row: {
    flex: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  legendText: {
    fontFamily: 'textFont-semiBold',
    color: Col.header,
    fontSize: 16
  },
  monthEvents: {
    textAlign: 'center', color: 'white', fontSize: 16,
    fontFamily: 'textFont-semiBold'
  },
  monthEventsContainer: {
    alignItems: 'center', justifyContent: 'center', width: 95, marginHorizontal: 10,
  },

  buttonBorder: {
    backgroundColor: Col.headerLight, borderRadius: 10
  },

  legendColor: {
    backgroundColor: 'white', 
    height: 13, width: 13, borderRadius: 13
  }

});



