export class User {
    /*
    type is number refer to type of user by deafult is 2 at registration
    0 ----> admin
    1 ----> security man - the person who is responsible for attanedence -
    2 ----> employee
    */
    static ADMIN_TYPE = 0;
    static SECURITY_Man_TYPE = 1;
    static EMPLOYEE_TYPE = 2;

    /*
    status is number refer to status of Account by deafult is 0 at registration  
    0 ----> not confirmed yet from admin
    1 ----> confirmed 
    */
    static NOT_CONFIRMED_STATUS = 0;
    static CONFIRMED_STATUS = 1;
    #username='';
    #fname='';
    #lname='';
    #email='';
    #age=0;
    #type = User.EMPLOYEE_TYPE;
    #address='';
    #status = User.NOT_CONFIRMED_STATUS;
    #password;
    constructor(_username, _fname, _lname, _email, _age, _address, _password,_status=User.NOT_CONFIRMED_STATUS,_type=User.EMPLOYEE_TYPE) {
        this.#username = _username;
        this.#fname = _fname;
        this.#lname = _lname;
        this.#email = _email;
        this.#age = _age;
        this.#address = _address;
        this.#type = _type;
        this.#status = _status;
        this.#password = _password;
    }
    set Username(_username) {
        if (_username.trim().length >= 3) {
            this.#username = _username;
        }
    }
    get Username() { return this.#username; }

    set Fname(_fname) {
        if (_fname.trim().length >= 3) {
            this.#fname = _fname;
        }
    }
    get Fname() { return this.#fname; }

    set Email(_email) {
        this.#email = _email;
    }

    get Email() { return this.#email; }

    set Lname(_lname) {
        if (_lname.trim().length >= 3) {
            this.#lname = _lname;
        }
    }
    get Lname() { return this.#lname; }

    set Age(_age) {
        this.#age = _age;
    }
    get Age() { return this.#age; }

    set Address(_address) {
        this.#address = _address;
    }
    get Address() { return this.#address; }

    set Type(_type) {
        this.#type = _type;
    }
    get Type() { return this.#type; }

    set Status(_status) {
        this.#status = _status;
    }
    get Status() { return this.#status; }

    set Password(_password) {
        this.#password = _password;
    }

    get Password() { return this.#password }

    isEmployee() {
        if (this.Type == User.EMPLOYEE_TYPE) return true;
        else return false;
    }
    isAdmin() {
        if (this.Type == User.ADMIN_TYPE) return true;
        else return false;
    }
    isSecurityMan() {
        if (this.Type == User.SECURITY_Man_TYPE) return true;
        else return false;
    }
    isConfirmed(){
        if (this.Status == User.CONFIRMED_STATUS) return true;
        else return false;
    }
    toJSON(){
        return {
            username: this.#username,
            password:this.#password,
            fname: this.#fname,
            lname: this.#lname,
            address: this.#address,
            age: this.#age,
            type: this.#type,
            status: this.#status,
            email: this.#email,
          };

    }

}