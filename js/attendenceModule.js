
export class AttendenceContext {
    #attendences = [];
    GetAllAttendences() {
        return JSON.parse(localStorage.getItem("ATTENDANCETABLE"));
    }
    getWorkDaysCount(email) {
        let length = 0;
        let attendences = this.GetByEmail(email);
        if (attendences) { length = attendences.length; }
        return length;
    }
    getLateDaysCount(email) {
        let attendences = this.GetByEmail(email);
        let count = 0;
        if (attendences) {
            for (let x = 0; x < attendences.length; x++) {
                if (attendences[x].late == true) count++;
            }
        }

        return count;
    }


    SaveChanges() {
        localStorage.setItem("ATTENDANCETABLE", JSON.stringify(this.#attendences));
    }
    AddAttendence(email) {
        let today = new Date();
        if (this.GetAllAttendences() != null) {
            this.#attendences = this.GetAllAttendences();
        }
        let lateORno = (today.getHours() + ":" + today.getMinutes() >= '08:30');
        let presence = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let date = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
        this.#attendences.push({ "email": email, "date":date , "presenceTime": presence, "departureTime":"", late: lateORno ,excuse:false });
        this.SaveChanges();
    }

    addOrDepart(email) {
        let today = new Date();
        let date =today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
        console.log(date);
        if (this.GetByEmailAndDate(email, date)){
            this.Depart(email);
        }
        else {
            this.AddAttendence(email);
        }

    }
    GetByEmailAndDate(email, date) {
        let attendence = null;
        if (this.GetAllAttendences() != null) {
            this.#attendences = this.GetAllAttendences();
            attendence = this.#attendences.find(function (at) {
                console.log( at["date"]);
                console.log( date);

                 if(at["email"] == email && at["date"] == date){
                    attendence=at;
                    console.log("found")
                    console.log(attendence);
                return true;  }
                else return false;
                });
                console.log(attendence);
                return attendence;

        }
        return attendence;
    }
    GetByEmailAndMonth(email, month) {
        let atts = null;
        if (this.GetAllAttendences() != null) {
            this.#attendences = this.GetAllAttendences();
            atts = this.#attendences.filter((at) => at["email"] == email && new Date(at["date"]).getMonth() == month);
        }
        return atts;
    }
    GetByDate(date) {
        let atts = null;
        if (this.GetAllAttendences() != null) {
            this.#attendences = this.GetAllAttendences();
            atts = this.#attendences.filter((at) => at["date"] == date);
            if (atts.length == 0) return null;
        }
        return atts;
    }
    GetByEmail(email) {
        let atts = null;
        if (this.GetAllAttendences() != null) {
            this.#attendences = this.GetAllAttendences();
            atts = this.#attendences.filter((at) => at["email"] == email);
            if (atts.length == 0) return null;
        }
        return atts;
    }
    GetCurrentAttendants(date) {
        let atts = null;
        if (this.GetAllAttendences() != null) {
            this.#attendences = this.GetAllAttendences();
            atts = this.#attendences.filter((at) => at["date"] == date && at["departureTime"] == "");
        }
        return atts;
    }
    Depart(email) {
        let today= new Date();
        let date=today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
        let excuse = (today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() <= '15:30:00');
        let attendence = this.GetByEmailAndDate(email, date);
        console.log(attendence);
        attendence["departureTime"] =  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        attendence['excuse']=excuse;
        this.SaveChanges();
    }
    DepartAll(date) {
        let atts = this.GetCurrentAttendants(date);
        for (let att in atts) {
            if (atts[att]["departureTime"] ==""){
                atts[att]["departureTime"] = "15:30:00";
            }
          
        }
        this.SaveChanges();
    }
    getTimeDifference(startTime, endTime) {
        let start = new Date(startTime).getTime();
        let end = new Date(endTime).getTime();
        let diff = new Date(Math.abs(start - end) - 7200000).toTimeString().slice(0, 8);
        return diff;
    }
    getWorkedHours(attendence) {
        let result = "00:00:00";
        if (attendence["departureTime"] != "")
            result = this.getTimeDifference(`0 ${attendence["presenceTime"]}`, `0 ${attendence["departureTime"]}`);
        else
            result = this.getTimeDifference(`0 ${attendence["presenceTime"]}`, new Date().getTime());

        return result;
    }
    getLateHours(attendence) {
        let result = "00:00:00";
        let presence = `0 ${attendence["presenceTime"]}`;
        if (new Date(`0 08:30:00`) < new Date(presence) && new Date(`0 15:30:00`) > new Date(presence)) {
            
            result = this.getTimeDifference(`0 08:30:00`, `0 ${attendence["presenceTime"]}`);
        }
        return result;
    }
    getExcuseHours(attendence) {
        let result = "00:00:00";
        if (attendence["departureTime"] != "" && new Date(`0 15:30:00`) > new Date(`0 ${attendence["departureTime"]}`)) {
            result = this.getTimeDifference(`0 15:30:00`, `0 ${attendence["departureTime"]}`);
        }
        return result;
    }
}
