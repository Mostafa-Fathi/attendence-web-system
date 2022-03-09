import { User } from "./UserModule.js";
import * as localStorageModule from "./localStorageModule.js";
function passwordCheck() {
  return ($('input:eq(5)').val() == $('input:eq(6)').val())
}
let fname = $('input:first').val();
let lname = $('input:eq(1)').val();
let address = $('input:eq(2)').val();
let age = parseInt($('input:eq(3)').val());
let email = $('input:eq(4)').val();
let password = $('input:eq(5)').val();
let status = User.CONFIRMED_STATUS;
let type = User.ADMIN_TYPE;
let username = $('input:eq(4)').val();
$(function() {
  alert("dsd");
});
$('form').on('submit', function (e) {
  e.preventDefault();
  fname = $('input:first').val();
  lname = $('input:eq(1)').val();
  address = $('input:eq(2)').val();
  age = parseInt($('input:eq(3)').val());
  email = $('input:eq(4)').val();
  username = $('input:eq(4)').val();
  if (passwordCheck()) {
    password = $('input:eq(5)').val();
    type = User.ADMIN_TYPE;
    status = User.CONFIRMED_STATUS;
    let newUser = new User(username, fname, lname, email, age, address, password, status, type);
    localStorageModule.addNewUser(newUser);
    location.replace("./../login.html");
  }
  else { alert('Please Check Password') }

});