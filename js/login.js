import { User } from "./UserModule.js";
import * as localStorageModule from "./localStorageModule.js";
  $(function() {
    
    if (!localStorageModule.getAllUsers()){
      alert('You must create an admin first ');
      location.replace("AdminReg.html");
    }

    else if (localStorageModule.countSecurityMen ()==0){
      alert('You must have at least one security');
      location.replace("registration.html");
    }

    $('form').on('submit',function(e){
      e.preventDefault();

      let inputUser= $('input:first').val();
      let inputPassword = $('input:eq(1)').val();
      if (localStorageModule.login(inputUser,inputPassword)){
        let currentUser = localStorageModule.getCurrentUser();
        if (currentUser.status==1){
          switch (currentUser.type) {
                        case User.ADMIN_TYPE: location.replace("../html/admin_home.html") ; break;
                        case User.SECURITY_Man_TYPE: location.replace("../html/secMan_home.html") ; break;
                        case User.EMPLOYEE_TYPE: location.replace("../html/emp_home.html"); break;
                    }
        }
        else if (currentUser.status==0){
          location.replace("../html/waitMesseage.html");
        }
      }
      else { 
        alert('Wrong Input user name or password ');
      }
    })

    
    document.getElementsByTagName('p')[0].addEventListener('click', function(){
    location.replace("../html/registration.html");});//end of reg button 
  });//end of on load 


