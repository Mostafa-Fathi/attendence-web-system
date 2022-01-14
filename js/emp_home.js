import { User } from "./UserModule.js";
import * as localStorageModule from "./localStorageModule.js";
import { AttendenceContext } from "./attendenceModule.js";

$(function () {
    let UsereArr = localStorageModule.getAllUsers();
    let attContext = new AttendenceContext();
    let employee = localStorageModule.getCurrentUser();
    let index = -1;

    function setTab(name) {
        $("#tabName").text(name);
        $("#tabName").append(`
         <span style="position: relative;margin: 0 10px;">
           <img style="position: absolute;top: 50%;transform: translateY(-50%);" src="/Images/menu.png">
        </span>`)
    }

    $('#profile').show();
    $('#emp').hide();
    $('#reports').hide();
    $('h2:first').text(localStorageModule.countEmployees());
    $('h2:last').text(localStorageModule.countSecurityMen());
    function profile() {
        $('aside.slide-menu-').children().children('li').css('background-color', '#0e3721');
        $('aside.slide-menu-').children().children('li:eq(0)').css('background-color', '#2e6d4c');
        $('#emp').hide();
        $('#reports').hide();
        $('#profile').show();

        let user = localStorageModule.getCurrentUser();
        console.log(user)
        $('#fname').text(user.fname);
        $('#lname').text(user.lname);
        $('#address').text(user.address);
        $('#age').text(user.age);
    }
    profile();
    $('aside.slide-menu-').children().children('li:eq(0)').on('click', profile);

    $('aside.slide-menu-').children().children('li:eq(1)').on('click', function () {
        $('aside.slide-menu-').children().children('li').css('background-color', '#0e3721');
        $('aside.slide-menu-').children().children('li:eq(1)').css('background-color', '#2e6d4c');
        $('#emp').hide();
        $('#reports').show();
        $('#profile').hide();
        dailyReport();
    });
    $('aside.slide-menu-').children().children('li:eq(2)').on('click', function (){localStorageModule.logout();});

    function dailyReport() {
        setTab($(this).text());
        let attendence = attContext.GetByEmailAndDate(employee["email"], new Date().toLocaleDateString());
        if (attendence != null) {
            let workedHours = attContext.getWorkedHours(attendence);
            let lateHours = attContext.getLateHours(attendence);
            let excuseHours = attContext.getExcuseHours(attendence);

            $("#tabcontent").html(
                `
<table class="indidata">
    <tr>
        <td>Presence Time</td>
        <td>${attendence["presenceTime"]}</td>
    </tr>
    <tr>
        <td>Departure Time</td>
        <td>${attendence["departureTime"] || "00:00:00"}</td>
    </tr>
    <tr>
        <td>Work Hours</td>
        <td>${workedHours}</td>
    </tr>
    <tr>
        <td>Late Hours</td>
        <td>${lateHours} (formal work hours starts at 08:30 am)</td>
    </tr>
    <tr>
        <td>Excuse Hours</td>
        <td>${excuseHours} (formal ends hours starts at 03:30 pm)</td>
    </tr>
</table>
`
            );
        } else {
            $("#tabcontent").text(`No Attendence found for today`)
        }
    }
    $('#reports').children().children('li:eq(0)').on('click', function () {
        dailyReport();
    })


    $('#reports').children().children('li:eq(1)').on('click', function () {
        setTab($(this).text());
        let attendences = attContext.GetByEmailAndMonth(employee["email"], new Date().getMonth());
        if (attendences != null) {
            $("#tabcontent").html(
                `
    <table id="monthTable">
        <thead>
            <tr>
                <th>day</th>
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
            for (let att in attendences) {
                let day = new Date(attendences[att]["date"]).getDate();
                let workedHours = attContext.getWorkedHours(attendences[att]);
                let lateHours = attContext.getLateHours(attendences[att]);
                let excuseHours = attContext.getExcuseHours(attendences[att]);
                $("#monthTable tbody").append(`
        <tr>
            <td>${day}</td>
            <td>${attendences[att]["presenceTime"]}</td>
            <td>${attendences[att]["departureTime"]}</td>
            <td>${workedHours}</td>
            <td>${lateHours}</td>
            <td>${excuseHours}</td>
        </tr>
    `);
            }
        }
        else {
            $("#tabcontent").text(`No Attendence found for this month`)
        }

    });


    $('#reports').children().children('li:eq(2)').on('click', function () {
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


});
