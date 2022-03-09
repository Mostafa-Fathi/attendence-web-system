import { AttendenceContext } from "./attendenceModule.js";
let attContext = new AttendenceContext();
let today = new Date();
let date =today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
$(document).ready(function () {
    setInterval(function () {
        var hours = today.getHours();
        $(".hours").html((hours < 10 ? "0" : "") + hours);
        
        if (hours>=15&&today.getMinutes>=30){
            attContext.DepartAll(date);
        }
        
    }, 1000);
    setInterval(function () {
        var minutes = today.getMinutes();
        $(".min").html((minutes < 10 ? "0" : "") + minutes);
    }, 1000);
    setInterval(function () {
        var seconds = today.getSeconds();
        $(".sec").html((seconds < 10 ? "0" : "") + seconds);
    }, 1000);
});