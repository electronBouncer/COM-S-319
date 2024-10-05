//Anthony Phan
//asianp12@iastate.edu
//Sep 20, 2024

console.log("Excersie 1");
console.log("-------------------");

function maxOfTwo (n1, n2){
    let max = n1;
    if(n2 > max){
        max = n2;
    }
    return max;
}

let n1 = 11;
let n2 = 10;
console.log(`The max between ${n1} and ${n2} is :`, maxOfTwo(n1,n2));

console.log("Excersie 2");
console.log("-------------------");

function maxOfArray(array){
    let max = array[0];
    for(let i = 1; i < array.length; i++){
        if(array[i] > max){
            max = array[i];
        }
    }
    return max;
}

let array = [10,11,1024,125,9,201];
console.log("The maximun number is: " ,maxOfArray(array));

console.log("Excersie 3");
console.log("-------------------");

function showProperties(movie){
    console.log("Here is the list of KEYS");
    for(let mykey in movie){
        console.log(mykey);
    }
    console.log("Here is the list of VALUES");
    for(let mykey in movie){
        console.log(movie[mykey]);
    }
    //console.log(Object.keys(movie));
    //console.log(Object.values(movie));
}

// Object :
const movie = {
    Title : 'Some movie',
    ReleaseYear: 2018,
    Rating: 4.5,
    Director: 'Steven Spielberg'
    };

    showProperties(movie);

console.log("Excersie 4");
console.log("-------------------");

const circle = {
    radius: 2,
    area: function(){
        return Math.PI * this.radius * this.radius;
    }
};

console.log(`The area of the circle is : ${circle.area().toFixed(2)}`);

console.log("Excersie 7");
console.log("-------------------");

function calculateAverageGrade(grades){

    let sum = 0;
    for(let subject in grades){
        console.log(grades[subject]);
        sum += grades[subject];
    }

//calculate the average
    return sum/Object.keys(grades).length; 
}

const grades = {
    math: 85,
    science: 90,
    history: 75,
    literature: 88
    };
    console.log("The average grade is : ", calculateAverageGrade(grades));

    console.log("Excersie 8");
    console.log("-------------------");

    function calculateAverageGradePerStudent(array){
        let sum = 0;
        let count = 0;
        let average = 0;
        let averageGrades = [];
        for(let i = 0; i < students.length; i++){
            for(let student in students[i]){
                console.log(student);
                for(let subject in students[i][student]){
                    console.log(students[i][student][subject]);
                    sum += students[i][student][subject];
                    count++;
                }
                average = sum/count;
                averageGrades.push({name: student, average: average});
                sum = 0;
                count = 0;
            }
        }
        return averageGrades
    }
    const students = [
        {
        Fer: {
        math: 85,
        science: 90,
        history: 75,
        literature: 88
        }
        },
        {
        Alex: {
        math: 99,
        science: 97,
        history: 94,
        literature: 90
        }
        },
        {
        Mary: {
        math: 79,
        science: 72,
        history: 81,
        literature: 79
        }
        }
        ];
        console.log("The average grade per student is : ", calculateAverageGradePerStudent(students));
    
