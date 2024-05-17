class Student {

    // Properties
    private studentId: string;
    private name: string;
    private enrolledCourses: string[];
    private balance: number;

    constructor(name: string, balance: number = 0) {
        this.studentId = this.idGenerator();
        this.name = name;
        this.enrolledCourses = [];
        this.balance = balance;
    }

    idGenerator(){
        let generatedId = ""
        for(let i = 0; i < 5; i ++)
            {
                let randomNumber = Math.ceil(Math.random() * 9)
                generatedId = generatedId + randomNumber
            }
        
        return generatedId
    }

    getStudentID(){
        return this.studentId
    }

    // Enroll student in a course and deduct course fee
    enroll(course: string, deBalance: number) {
        this.enrolledCourses.push(course);
        this.balance -= deBalance;
    }
    
    getEnrolledCourse()
    {
        return this.enrolledCourses
    }

    addBalance(balance: number) {
        this.balance += balance
    }

    getBalance(){
        return this.balance
    }
    showStatus() {
        console.log(`Student Details:
        Name: ${this.name}
        Student ID: ${this.studentId}
        Enrolled Courses: ${this.enrolledCourses.join(', ')}
        Balance: Rs: ${this.balance}`);
    }
} 

// make it export default to use in another file
export default Student