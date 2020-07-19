import $ from "jquery";

//Tools
import Listener from './tools/listener';

export default class App {
  constructor(){
    window.globalListener = new Listener();
  }
};
