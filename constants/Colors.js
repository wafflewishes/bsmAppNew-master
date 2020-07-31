import { color } from "react-native-reanimated";
import Preferences from "./Preferences";

export var tintColor = 'white';


const normal = {
  tintColor,
  header: "#4b89ac",
  headerLight: '#65A3c6',

  today: '#90c5e6',

  special: '#e0a227', 
  monthly: "#83a6ec", 
  community: '#0095a3', 
  multiple: '#c1554e', 
  past: '#63686d',
  base: '#e0a227', 

  shadow: 'rgba(0,0,0,1)',

  background: 'white',
  textColor: 'black',

  lightBlue: "rgba(124,185,231,1)",
  titleColour: "#4b89ac",
  lightGold: "#e0a227",

  grey: "#292f33",
  lightGrey: '#63686d',

  tabIconDefault: '#9ecaeb',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
}

const dark = {
  tintColor,
  header: "black",
  headerLight: '#65A3c6',

  today: '#90c5e6',

  special: '#e0a227', 
  monthly: "#83a6ec", 
  community: '#0095a3', 
  multiple: '#c1554e', 
  past: '#63686d',
  base: '#e0a227', 

  shadow: 'rgba(0,0,0,1)',

  background: 'white',
  textColor: 'black',

  lightBlue: "rgba(124,185,231,1)",
  titleColour: "#4b89ac",
  lightGold: "#e0a227",

  grey: "#292f33",
  lightGrey: '#63686d',

  tabIconDefault: '#9ecaeb',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
}

var pallette = normal;

export function setPallette(){
  var isDark = Preferences.darkMode;
  if(isDark){
    pallette = dark;
  }
  else pallette = normal;
}

export default pallette;
