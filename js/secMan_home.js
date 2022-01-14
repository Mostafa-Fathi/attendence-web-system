import { User } from "./UserModule.js";
import * as localStorageModule from "./localStorageModule.js";
import { AttendenceContext } from "./attendenceModule.js";
  $(function() {
    
      $('form').on('submit',function(e){
          let email= $('input').val();
      e.preventDefault();   
        if (localStorageModule.getByEmail(email)){
            AttendenceContext.addOrDepart(email);
            alert('Attendence Recorded');
            $('input').val()='';
        }
        else { alert("Wrong Email ");}

    })

    
    document.getElementsByTagName('p')[0].addEventListener('click', function(){
    localStorageModule.logout();});//end of reg button 
  });//end of on load 
