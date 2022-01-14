import { User } from "./UserModule.js";
import * as localStorageModule from "./localStorageModule.js";
import { AttendenceContext } from "./attendenceModule.js";

$(function () {
    let empContext = localStorageModule.getAllUsers();
    let attContext = new AttendenceContext();
    let employee = null;
    let index = -1;
    $('aside.slide-menu-').children().children('li:eq(3)').on('click', function (){localStorageModule.logout();});

    function setTab(name) {
        $("#tabName").text(name);
        $("#tabName").append(`
         <span style="position: relative;margin: 0 10px;">
           <img style="position: absolute;top: 50%;transform: translateY(-50%);" src="/Images/menu.png">
        </span>`)
    }

    $('#profile').hide();
    $('#emp').hide();
    $('#reports').hide();
    $('h2:first').text(localStorageModule.countEmployees());
    $('h2:last').text(localStorageModule.countSecurityMen());

    $('aside.slide-menu-').children().children('li:eq(0)').css('background-color', '#2e6d4c');

    $('aside.slide-menu-').children().children('li:eq(0)').on('click', function () {
        //DashBorad

        $('aside.slide-menu-').children().children('li').css('background-color', '#0e3721');
        $('aside.slide-menu-').children().children('li:eq(0)').css('background-color', '#2e6d4c');
        $('#dashboard').show();
        $('#emp').hide();
        $('#reports').hide();
        $('#profile').hide();



    });

    $('aside.slide-menu-').children().children('li:eq(1)').on('click', function () {
        //profile
        $('aside.slide-menu-').children().children('li').css('background-color', '#0e3721');
        $('aside.slide-menu-').children().children('li:eq(1)').css('background-color', '#2e6d4c');
        $('#dashboard').hide();
        $('#emp').hide();
        $('#reports').hide();
        $('#profile').show();

        let user = localStorageModule.getCurrentUser();
        console.log(user)
        $('#fname').text(user.fname);
        $('#lname').text(user.lname);
        $('#address').text(user.address);
        $('#age').text(user.age);

    });

    $('aside.slide-menu-').children().children('li:eq(2)').on('click', function () {
        $('aside.slide-menu-').children().children('li').css('background-color', '#0e3721');
        $('aside.slide-menu-').children().children('li:eq(2)').css('background-color', '#2e6d4c');
        $('#dashboard').hide();
        $('#emp').hide();
        $('#reports').show();
        $('#profile').hide();
        allEmps();
    });

    function allEmps() {
        setTab($(this).text());
        $("#tabcontent").html(
            `
         <table class="indidata" id='emp' style="width: 100%; border-collapse: collapse;">
             <thead>
                    <tr>
                        <th>User Name</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Role</th>
        
                    </tr>
                </thead>
                <tbody id ="empTable"></tbody>
         </table>
`
        );
        let useArr = localStorageModule.getAllUsers();
        console.log(useArr);
        $('#empTable').html('');
        for (let x = 0; x < useArr.length; x++) {
            if (!(localStorageModule.getCurrentUser().username == useArr[x].username)) {
                var createdtr = document.createElement('tr');
                var createdtd = document.createElement('td');
                createdtd.innerText = useArr[x].username;
                createdtr.appendChild(createdtd);
                var createdtd = document.createElement('td');
                createdtd.innerText = useArr[x].fname;
                createdtr.appendChild(createdtd);
                var createdtd = document.createElement('td');
                createdtd.innerText = useArr[x].lname;
                createdtr.appendChild(createdtd);
                var createdtd = document.createElement('td');
                createdtd.innerText = useArr[x].age;
                createdtr.appendChild(createdtd);
                var createdtd = document.createElement('td');
                createdtd.innerText = useArr[x].email;
                createdtr.appendChild(createdtd);
                var createdtd = document.createElement('td');
                createdtd.innerText = useArr[x].address;
                createdtr.appendChild(createdtd);
                var createdtd = document.createElement('td');
                let role = ' ';
                let stauts;
                switch (useArr[x].type) {
                    case User.ADMIN_TYPE: role = 'Admin'; break;
                    case User.SECURITY_Man_TYPE: role = 'Security Manager'; break;
                    case User.EMPLOYEE_TYPE: role = 'EMPLOYEE'; break;
                }
                createdtd.innerText = role;
                if (useArr[x].status!=User.CONFIRMED_STATUS){
                let createdbtn = document.createElement('button');
                createdbtn.innerHTML = 'confirm';
                createdbtn.style.color = 'green'
                createdbtn.addEventListener('click', function(e){
                    localStorageModule.confirmation(useArr[x].username);
                    e.stopPropagation();
                    allEmps();
                });
                createdtd.appendChild(createdbtn);
                }
                createdtr.appendChild(createdtd);
                if (index == x) {
                    createdtr.style.backgroundColor = '#0e3721';
                }
                createdtr.addEventListener('click', function (e) {
                    console.log(useArr[x]);
                    employee = useArr[x];
                    $('#empTable').css('background-color', '#2e6d4c');
                    $('#empTable').find('tr').css('background-color', '#2e6d4c');
                    index = x;
                    e.target.parentElement.style.backgroundColor = '#0e3721';
                    alert(`You choosed ${useArr[x].username} to know more about `);


                })
                $('#empTable').append(createdtr);

            }
        }


    }

    $('#reports').children().children('li:eq(0)').on('click', allEmps);

    $('#reports').children().children('li:eq(1)').on('click', function () {
        setTab($(this).text());
        $("#tabcontent").html(`
choose the date to get the report : <input type="date" id="date">
<div id="result"></div>
`);
        $("#date").change(function () {
            $("#result").empty();
            let date = new Date($(this).val()).toLocaleDateString();
            let atts = attContext.GetByDate(date);
            if (atts != null) {
                $("#result").append(
                    `
            <table id="allattssTable">
                <thead>
                    <tr>
                        <th>full name</th>
                        <th>presence time</th>
                        <th>departure time</th>
                        <th>worked hours</th>
                        <th>late hours</th>
                        <th>excuse hours</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        `);
                for (let att in atts) {
                    let emp = localStorageModule.getByEmail(atts[att]["email"]);

                    $("#allattssTable tbody").append(`
                <tr>
                    <td>${emp["fname"]} ${emp["lname"]}</td>
                    <td>${atts[att]["presenceTime"]}</td>
                    <td>${atts[att]["departureTime"]}</td>
                    <td>${attContext.getWorkedHours(atts[att])}</td>
                    <td>${attContext.getLateHours(atts[att])}</td>
                    <td>${attContext.getExcuseHours(atts[att])}</td>
                </tr>
            `);
                }
            } else {
                $("#result").append(`<p id="no">No attendences for this day</p>`);
            }
        });

    });

    $('#reports').children().children('li:eq(2)').on('click', function () {
        setTab($(this).text());
        $("#tabcontent").html(`
choose the date to get the late employees : <input type="date" id="date">
<div id="result"></div>
`);
        $("#date").change(function () {
            $("#result").empty();
            let date = new Date($(this).val()).toLocaleDateString();
            let atts = attContext.GetByDate(date);
            console.log("fdddddddddddddddddddd");
            if (atts != null) {
                let lateatts = atts.filter((att) => attContext.getLateHours(att) != "00:00:00");
                if (lateatts.length != 0) {
                    console.log(lateatts);
                    $("#result").append(
                        `
            <table id="allattssTable">
            <thead>
                <tr>
                <th>full name</th>
                <th>presence time</th>
                <th>departure time</th>
                <th>worked hours</th>
                <th>late hours</th>
                </tr>
            </thead>
            <tbody>
            
            </tbody>
            </table>
            `);
                    for (let att in lateatts) {
                        let emp = localStorageModule.getByEmail(lateatts[att]["email"]);

                        $("#allattssTable tbody").append(`
                <tr>
                <td>${emp["fname"]} ${emp["lname"]}</td>
                <td>${lateatts[att]["presenceTime"]}</td>
                <td>${lateatts[att]["departureTime"]}</td>
                <td>${attContext.getWorkedHours(lateatts[att])}</td>
                <td>${attContext.getLateHours(lateatts[att])}</td>
                </tr>
            `);
                    }
                }
                else {
                    $("#result").append(`<p id="no">No late employees for this day</p>`);
                }
            } else {
                $("#result").append(`<p id="no">No attendences for this day</p>`);
            }
        });

    });

    $('#reports').children().children('li:eq(3)').on('click', function () {
        setTab($(this).text());
        $("#tabcontent").html(`
choose the date to get the excused employees : <input type="date" id="date">
<div id="result"></div>
`);
        $("#date").change(function () {
            $("#result").empty();
            let date = new Date($(this).val()).toLocaleDateString();
            let atts = attContext.GetByDate(date);
            if (atts != null) {
                let exatts = atts.filter((att) => attContext.getExcuseHours(att) != "00:00:00");
                if (exatts.length != 0) {
                    console.log(exatts);
                    $("#result").append(
                        `
        <table id="allattssTable">
        <thead>
            <tr>
            <th>full name</th>
            <th>presence time</th>
            <th>departure time</th>
            <th>worked hours</th>
            <th>excuse hours</th>
            </tr>
        </thead>
        <tbody>
        
        </tbody>
        </table>
        `);
                    for (let att in exatts) {
                        let emp = empContext.GetByEmail(exatts[att]["email"]);

                        $("#allattssTable tbody").append(`
            <tr>
            <td>${emp["firstName"]} ${emp["lastName"]}</td>
            <td>${exatts[att]["presenceTime"]}</td>
            <td>${exatts[att]["departureTime"]}</td>
            <td>${attContext.getWorkedHours(exatts[att])}</td>
            <td>${attContext.getExcuseHours(exatts[att])}</td>
            </tr>
        `);
                    }
                }
                else {
                    $("#result").append(`<p id="no">No excused employees for this day</p>`);
                }
            } else {
                $("#result").append(`<p id="no">No attendences for this day</p>`);
            }
        });
    });

    $('#reports').children().children('li:eq(4)').on('click', function () {
        // breif 

        setTab($(this).text());
        if (employee != null) {
            $("#tabcontent").html(`
        <ul id="counters">
            <li class="cicle">
                <h2>${attContext.getWorkDaysCount(employee.email)}</h2>
                <h4>Days at work</h4>
            </li>
            <li class="cicle" style="float: left;">
                <h2>${attContext.getLateDaysCount(employee.email)}</h2>
                <h4>Days came late</h4>
            </li>
        </ul>

`);
        }
        else {
            alert('Please select an Employee')
            allEmps();
        }


    });

    

   

    $('#reports').children().children('li:eq(5)').on('click', function () {
        setTab($(this).text());
        $("#tabcontent").html(`
<input type="text" id="email" placeholder="enter user email" style="width:200px">
<select id="role" style="width:200px">
    <option value="-1">choose role</option>
    <option value="2">employee</option>
    <option value="1">security</option>
    <option value="0">admin</option>
</select><br>
<input type="button" value="save" id="save"><span id="message"></span>
`);
        $('#tabcontent').children().css('color', 'black');
        $("#save").click(function () {

            let email = $("#email").val();
            let role = $("#role").val();
            if (email != "" && role != "" && role != "-1") {
                if (localStorageModule.getByEmail(email) != null) {
                    role = parseInt(role);
                    console.log(role);
                    localStorageModule.changeRole(email, role);
                    $("#message").text("role applied successfully");
                }
                else
                    $("#message").text("failed to apply the role").css("color", "red");
            } else
                $("#message").text("failed to apply the role").css("color", "red");

            $("#username").val("");
            $("#role").val("0");
        })
    });

});

