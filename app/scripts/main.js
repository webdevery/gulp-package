import $ from "jquery";
import Swiper from "swiper";

var App = function() {
  var mySwiper = new Swiper(".slider", {
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 3
  });
};

export default App;
