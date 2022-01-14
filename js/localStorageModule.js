import { User } from "./UserModule.js";
export function getCurrentUser() {
    if (localStorage.getItem("CURRENT")) {

        return JSON.parse(localStorage.getItem("CURRENT"));

    }
    else { return null; }
}
export function login(_username,_pass) {
    let flag = false;
    let UsersArr =getAllUsers();
    UsersArr.find(function(user,index){

        if (user.username.toLowerCase() == _username.toLowerCase()){
            if (user.password ==_pass){
                flag = true;
                localStorage.setItem("CURRENT", JSON.stringify(user));
                return true;
            }
        }
    });
    return flag;
}
export function logout() {
    localStorage.setItem("CURRENT", null);
    location.replace("../login.html");
}
export function confirmation(username){

    let UsersArr = [];
    let User;
    if (getAllUsers()) {
        UsersArr = getAllUsers();
        UsersArr.find(function(user) {
            if (user.username == username) {
                
                user.status = 1;
                localStorage.setItem("ALLUSERS", JSON.stringify(UsersArr));
                console.log(User);
                return true;}
                else return false;
        })
        return User;
    }
    else return null;
}

export function getAllUsers() {

    if (localStorage.getItem("ALLUSERS")) {
        let UsersArr = [];
         UsersArr = JSON.parse(localStorage.getItem("ALLUSERS"));
/*
        for (let x = 0; x < JsonArr.length; x++) {
            UsersArr.push(JSON.parse(JsonArr[x]));
        }*/
        return UsersArr;
    }
    else { return null; }
}

export function addNewUser(user) {
    let UsersArr = [];
    if (getAllUsers()) {
        UsersArr = getAllUsers();
    }

    UsersArr.push(user);
    localStorage.setItem("ALLUSERS", JSON.stringify(UsersArr));
}
export function getAttendanceTable() {
    return JSON.parse(localStorage.getItem("ATTENDANCETABLE"));
}

export function getByEmail(_email) {

    let UsersArr = [];
    let User;
    if (getAllUsers()) {
        UsersArr = getAllUsers();
        UsersArr.find(function(user) {
            if (user.email.toLowerCase() == _email.toLowerCase()) {
                User = user;
                console.log(User);
                return true;}
                else return false;
        })
        return User;
    }
    else return null;


}

export function attend(user) {
    let today = new Date();
    let AttendArr = []
    let lateORno = (today.getHours() + ":" + today.getMinutes() <= '08:30');
    let attObject = {
        username: user.Username,
        day: today.getDate(),
        month: today.getMonth(),
        in: today.getHours() + ":" + today.getMinutes(),
        out: 0,
        late: lateORno,
        excuse: false,
    };
    if (getAttendanceTable()) { AttendArr = getAttendanceTable(); }

    AttendArr.push(attObject);
    localStorage.setItem("ATTENDANCETABLE", JSON.stringify(AttendArr));
}

export function leave(user, date) {
    let excuse = (date.getHours() + ":" + date.getMinutes() >= '15:30');
    let AttendArr = [];
    AttendArr = getAttendanceTable();
    AttendArr.find(function (o, i) {
        if (o.username == user.Username && o.day == date.getDate() && o.month == date.getMonth()) {
            o.out = date.getHours() + ":" + date.getMinutes();
            o.excuse = excuse;
            return true;
        }
    });
    localStorage.setItem("ATTENDANCETABLE", JSON.stringify(AttendArr));
}

export function countSecurityMen (){
    if (getAllUsers()){
        let count = 0;
        let UsersArr = getAllUsers();
        for (let x = 0 ; x < UsersArr.length;x++){
        if (UsersArr[x].type==1){
            console.log("in incrment");
            
            count++;
        console.log(count);}
        }
        return count;
    }
    else return 0;
}
export function countEmployees(){
    if (getAllUsers()){
        let count = 0;
        let UsersArr = getAllUsers();
        for (let x = 0 ; x < UsersArr.length;x++){
        if (UsersArr[x].type==2){
            console.log("in incrment");
            
            count++;
        console.log(count);}
        }
        return count;
    }
    else return 0;
}

export function isEmailValid(email){
    let flag=true;
    if (getAllUsers()){
        let UsersArr = getAllUsers();
        UsersArr.find(function (user){
            if (user.email==email){
                flag = false;
                return true;}
        });
         return flag; 
    }
else { return true; }

}
export function changeRole(email,role){
    let UsersArr = [];
    let User;
    if (getAllUsers()) {
        UsersArr = getAllUsers();
        UsersArr.find(function(user) {
            if (user.email == email) {
                User = user;
                user.type = role;
                localStorage.setItem("ALLUSERS", JSON.stringify(UsersArr));
                console.log(User);
                return true;}
                else return false;
        })
        return User;
    }
    else return null;
}