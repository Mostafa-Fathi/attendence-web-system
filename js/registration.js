import { User } from "./UserModule.js";
import * as localStorageModule from "./localStorageModule.js";
$(function () {
  let fname = $('input:first').val();
  let lname = $('input:eq(1)').val();
  let address = $('input:eq(2)').val();
  let age = parseInt($('input:eq(3)').val());
  let email = $('input:eq(4)').val();

  if (localStorageModule.countSecurityMen() == 0) {
    $('div:eq(1)').text('Welcome sir you need to have at least one Security man ');
  }

  $('form').on('submit', function (e) {
    e.preventDefault();

    fname = $('input:first').val();
    lname = $('input:eq(1)').val();
    address = $('input:eq(2)').val();
    age = parseInt($('input:eq(3)').val());
    email = $('input:eq(4)').val();

    function generateId() {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    };
    if (localStorageModule.isEmailValid(email)) {
      let username = generateId();
      let password = generateId().substr(6, 4);
      sendMail(email, username, password);
      //    location.replace("waitMesseage.html");
    }
    else {
      alert("This is email is already have an account\nIf you have a problem with log in\nCall the Admin please ");
    }

  });


  function sendMail(_email, _username, _password) {
    Email.send({
      SecureToken: "e35b0d4a-d6ad-4358-a6d4-596482d388b8",
      To: _email,
      From: "mostafafathy42iti@gmail.com",
      Subject: 'Your credentials in Attandence system',
      Body: `Dear Sir you username is ${_username} and your password is ${_password}`,

    })
      .then(function (message) {
        let newUser = new User(_username, fname, lname, _email, age, address, _password);

        if (localStorageModule.countSecurityMen() == 0) {
          newUser = new User(_username, fname, lname, _email, age, address, _password, User.CONFIRMED_STATUS, User.SECURITY_Man_TYPE);
          localStorageModule.addNewUser(newUser);
          location.replace("./../login.html");
        }
        else {
          localStorageModule.addNewUser(newUser);
          location.replace("./../html/waitMesseage.html");

        }


      }, function (error) {
        console.log(error);
        alert('Error while trying to create new user try again or check your internet connection');
      });
  }//end send mail 
});//end of load 
