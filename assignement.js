//1.Create a variable called bunny
// using var and assign it your bunny's name.
// Then declare dog with let and cat with const. Print all three names.

// var bunny = "Bisco";
let dog = "Bingo";
const cat = "Whisky";

// 2. Which of these names are
// allowed in JavaScript? For each one,
// write valid or invalid, then write a correct version of any invalid name.

// 1bunny - invalid -> correct version will be bunny1
// _bunny - valid
// $bunny - valid
// -bunny - invalid -> correct version bunny
// @bunny - invalid -> correct version bunny
// bunnyName - valid

// 3. Predict the output, then run the code.
// In one or two sentences, explain why var and
// let behave differently here.
//answer
//console.log(pet); //the  output of this is undefined
var pet = "lucy";

//console.log(animal); //the output  of this is a refferenceError because the varable is still in a temporal dead zone
let animal = "tom";

//4. Write two short examples:
// a local scope variable inside a function called animalName

let oldAnimal = "Tortoise"; // this is a global; variable that can be accessed across the entire javascript environment

function animalName() {
  let newAnimal = "bunny"; // this is a local vraible inside a function
  console.log(newAnimal, oldAnimal);
}

//5. Declare a variable named bunny and assign it an object with:
// const bunny = {
//   name: "Lucy", // string
//   age: 20, // number
//   isHappy: true, // boolean
// };
// console.log(bunny.name);
// console.log(bunny.age);
// console.log(bunny.isHappy);

// 6. For each value below, print the value and its type using typeof:
console.log(typeof 3.14); // number
console.log(typeof "Lucy"); // string
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object
console.log(typeof Symbol("lucy")); // symbol
console.log(typeof { name: "Lucy" }); // object
console.log(typeof ["Lucy", "Tom"]); // object

//7. Create an array called mixedDataTypes that holds at least one
//  boolean, one number, one string, null, undefined, and one object.
// Print the array and its length.

const mixedDataTypes = [true, 10, "Lucy", null, undefined, { name: "Lucy" }];
console.log(mixedDataTypes);
console.log(mixedDataTypes.length); // 6

//8. Write a function sumBunnies that has no parameters.
//  Inside it, create blackBunnies = 10 and whiteBunnies = 20,
// add them, and return the total. Call the function and print the result.

// function sumBunnies() {
//   const blackBunnies = 10;
//   const whiteBunnies = 20;
//   let total = 0;
//   return (total = whiteBunnies + blackBunnies);
// }

// const totalNumberOfBunnies = sumBunnies();
// console.log(totalNumberOfBunnies);

// 9. Rewrite sumBunnies so it takes two parameters,
//  blackBunnies and whiteBunnies. Call it with sumBunnies(10, 20)
// and with sumBunnies(7, 3).

function sumBunnies2(blackBunnies, whiteBunnies) {
  return blackBunnies + whiteBunnies;
}
const result1 = sumBunnies2(10, 20);
const result2 = sumBunnies2(7, 3);
console.log(result1);
console.log(result2);

//10. Rewrite question 9 as:

const sumBunnies3 = function (blackBunnies, whiteBunnies) {
  return blackBunnies + whiteBunnies;
}; // as an anonymous function stored in a variable

const sumBunnies4 = (blackBunnies, whiteBunnies) => {
  return blackBunnies + whiteBunnies;
}; //as an arrow function stored in a variable

// 11. Write an IIFE that adds 10 black bunnies and
// 20 white bunnies and prints the total as soon as the file runs.
// Do not call it by name afterwards.

//IIFE --> Immediately Invoked Function Expression

(function (blackBunnies = 10, whiteBunnies = 20) {
  console.log(blackBunnies + whiteBunnies);
})();

//12. Create an array called bunnies with six bunny names.

// const bunnies = ["Lucy", "Bisco", "Sweaty", "Hairy", "Sweet", "Feathers"];
// bunnies.unshift("Mario");
// bunnies.push("Luigi");
// bunnies.splice(1, 1);
// console.log(bunnies);

// 13. Using this array:

// const bunnies = ["Lucy", "Tom", "Molly", "Bella"];
// console.log(bunnies[0]); // first item
// console.log(bunnies[bunnies.length - 1]); // last item
// console.log(bunnies.findIndex((value) => value === "Tom")); // index of tom
// const copyOfBunnies = [...bunnies]; // copy of bunny

//14. Loop through bunnies with a for loop and print:

// Bunny Lucy is scheduled for a checkup today.

// for (let i = 0; i <= bunnies.length - 1; i++) {
//   //   if (bunnies[i] === "Lucy") {
//   console.log(`Bunny ${bunnies[i]} is scheduled for a checkup today.`);
//   //   }
// }

// 15. Using this nested array:
// const nestedArrays = [
//   ["Lucy", "Tom"],
//   ["Molly", "Bella"],
// ];

// console.log(nestedArrays[0][0]); // Lucy
// console.log(nestedArrays[1][1]); // Bella

// for (let i = 0; i <= nestedArrays.length - 1; i++) {
//   for (let a = 0; a <= nestedArrays[i].length - 1; a++) {
//     console.log(nestedArrays[i][a]); // all the names of the bunnies in the nested array
//   }
// }

//16. Create a JavaScript object called bunny with name, age, and isHappy.
// Convert it to JSON, store it in bunnyJSON, and print bunnyJSON.

const bunny = {
  name: "Lucy", // string
  age: 20, // number
  isHappy: true, // boolean
};
// const bunnyJSON = JSON.stringify(bunny)
// console.log(bunnyJSON)

// 17. Start with this JSON string:
let bunnyJSON = '{"name":"Lucy","age":3,"isHappy":true}';
bunnyJSON = JSON.parse(bunnyJSON);
console.log(bunnyJSON.name);
console.log(bunnyJSON.age);

//18. Given:

let bunny_age = 3;
let dog_age = "3";

console.log(bunny_age == dog_age); // true
console.log(bunny_age === dog_age); // false
console.log(bunny_age != dog_age); // false
console.log(bunny_age !== dog_age); // true
//In one sentence, explain the difference between == and ===.
//the difference between == and === is that == only checks for the value and ignores the datatypes but === checks both the value and the datatype

// 19. Create two arrays, bunnies and dogs, with any number of names. Use <= to compare their lengths.
// const bunnies = ["Lucy", "Eva", "Feathers"];
// const dogs = ["Bingo", "Brother"];
// console.log(bunnies.length <= dogs.length); // false

//If the number of bunnies is less than or equal to the number of dogs, print There are more dogs than bunnies
// if (bunnies.length <= dogs.length) {
//   console.log("There are more dogs than bunnies");
// } else {
//   console.log("There are more bunnies than dogs");
// }

//20. A bunny's health can be 'healthy', 'sick', or anything else.

// Write this check three ways:

// if / else if / else
// a switch statement
// a ternary operator (healthy vs not healthy is enough for the ternary)
const aNewBunny = {
  name: "Lucy",
  age: 30,
  isHealthy: true,
};

// if / else if / else

if (aNewBunny.isHealthy) {
  console.log("Bunny is healthy");
} else if (!aNewBunny.isHealthy) {
  console.log("Bunny is Sick");
} else {
  console.log("We don't know the health status of Bunny");
}

// a switch statement
switch (aNewBunny.isHealthy) {
  case true:
    console.log("Bunny is healthy");
    break;
  case false:
    console.log("Bunny is sick");
    break;
  default:
    console.log("We don't know the health status of Bunny");
}

// a ternary operator (healthy vs not healthy is enough for the ternary)
aNewBunny.isHealthy
  ? console.log("Bunny is healthy")
  : console.log("Bunny is sick");

//   21. Write a function that takes a number and uses a ternary operator to return 'even' or 'odd'. Test it with 4, 7, and 0.
function checkEven(value) {
  return value > 0
    ? value % 2 == 0
      ? "Even"
      : "Odd"
    : "Put a non negative number";
}
console.log(checkEven(4));
console.log(checkEven(7));
console.log(checkEven(0));

//22. Write a for loop that prints Number 0 through Number 9.
//Then write a while loop that does the same thing.
for (let i = 0; i <= 9; i++) {
  console.log(i);
}

let a = 0;
while (a <= 9) {
  console.log(a);
  a++;
}

//23. Write a while loop that counts down from 9 to 1 and prints each number. Then write the same countdown with a for loop.
let b = 9;
while (b >= 0) {
  console.log(b);
  b--;
}

for (let i = 9; i >= 0; i--) {
  console.log(i);
}

//24. Write sumBunnies(blackBunnies, whiteBunnies) so that it throws an error if either argument is not a number. Wrap a call to sumBunnies(10, 'twenty') in try / catch and print the error message.

function sumBunnies(blackBunnies, whiteBunnies) {
  if (typeof blackBunnies != "Number" || typeof whiteBunnies != "number") {
    throw new Error("Bunnies must be a number");
  }
  return blackBunnies + whiteBunnies;
}

// sumBunnies(10, "twenty");

// 25. Using the operators from this topic, write one small program that:

// assigns blackBunnies = 10 and whiteBunnies = 5
// prints whether they are equal (===)
// prints the total (+)
// prints whether there are more than 12 bunnies in total (&& or > is fine)
// prints 'Yes' or 'No' with a ternary if the total is greater than 12

const blackBunnies = 10;
const whiteBunnies = 5;
const total = blackBunnies + whiteBunnies;
console.log(blackBunnies === whiteBunnies);
console.log(total);
if (total > 12) {
  console.log("There are more than 12 bunnies");
}

total > 12 ? "Yes" : "No";

// Brain Teaser 1 — The quiet loop

// What does this print, and why does it stop? (Do not run it first. Predict, then check.)

// let carrots = 3;

// while (carrots) {
//   console.log("munch");
//   carrots--;
// }
// Then answer: what would happen if you deleted carrots--;?

//Answer
// this prints because the value of while is greater than zero
// this will stop when the value of while is less than or equal to 0
// if we delete the line carrots--; we run into an infinite loop because the value of carrots will remain true since it is greater than 0

// Brain Teaser 2 — For vs while, same farm

// You have this array:

// const bunnies = ["Lucy", "Tom", "Molly", "Bella", "Mario", "Luigi"];
// // Print only the bunnies whose names have more than 4 letters.

// // First with a for loop
// // Then with a while loop
// // Both answers must print the same names.

// for (let i = 0; i <= bunnies.length - 1; i++) {
//   if (bunnies[i].length >= 4) {
//     console.log(bunnies[i]);
//   }
// }
// let ab = 0;
// while (ab <= bunnies.length - 1) {
//   if (bunnies[ab].length >= 4) {
//     console.log(bunnies[ab]);
//   }
//   ab++;
// }

// Brain Teaser 3 — Nested checkup

const nestedArrays = [
  ["Lucy", "Tom"],
  ["Molly", "Bella"],
  ["Mario", "Luigi"],
];
// Using nested loops, print a numbered list like:

// 1. Lucy
// 2. Tom
// 3. Molly
// ...
// The numbers must keep going across all inner arrays, not restart at 1 for each pair.
let numbering = 0;
for (let i = 0; i <= nestedArrays.length - 1; i++) {
  for (let a = 0; a <= nestedArrays[i].length - 1; a++) {
    numbering += 1;
    console.log(`${numbering}. ${nestedArrays[i][a]}`); // all the names of the bunnies in the nested array
  }
}

// Brain Teaser 4 — Loop + condition + function

// Write a function countHappyBunnies(bunnies) that takes an array of objects like:

const bunnies = [
  { name: "Lucy", isHappy: true },
  { name: "Tom", isHappy: false },
  { name: "Molly", isHappy: true },
];
// Use a loop inside the function. Return how many bunnies have isHappy === true. Then use a ternary to print 'Most bunnies are happy' if the happy count is greater than or equal to half the array length, otherwise 'Most bunnies are not happy'.

function countHappyBunnies(bunniesObject) {
  let happyBunniesCount = 0;
  for (let bunny of bunniesObject) {
    if (bunny.isHappy) {
      happyBunniesCount += 1;
    }
  }
  console.log(
    happyBunniesCount >= bunniesObject.length / 2
      ? "Most bunnies are happy."
      : "Most bunnies are not happy.",
  );
  return happyBunniesCount;
}

const val = countHappyBunnies(bunnies);
console.log(val);

// Brain Teaser 5 — The loop that almost lies

// Predict the output of both snippets. Then fix snippet B so it prints 0 1 2 3 4 like snippet A.

// Snippet A
for (let i = 0; i < 5; i++) {
  console.log(i);
}

//outcome: 0,1,2,3,4

// Snippet B
let i = 0;
while (i < 5) {
  console.log(i);
}

//outcome: infinite loop

// Snippet B fix
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
//outcome:1,2,3,4

// After you fix it, write one sentence: when should you pick for, and when should you pick while?

//you use for when you know the size of the dataset to loop through whilst you use while when the outcome is undetermined
