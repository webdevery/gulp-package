import $ from "jquery";
import Swiper from "swiper";

export let App = function() {
  var mySwiper = new Swiper(".slider", {
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 3
  });
};
