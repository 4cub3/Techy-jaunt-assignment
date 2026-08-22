# JavaScript Basics — Questions & Answers

## 1. Create a variable called `bunny`

Using `var` and assign it your bunny's name. Then declare `dog` with `let` and `cat` with `const`. Print all three names.

```javascript
var bunny = "Bisco";
let dog = "Bingo";
const cat = "Whisky";
```

---

## 2. Which of these names are allowed in JavaScript?

For each one, write valid or invalid, then write a correct version of any invalid name.

| Name | Valid? | Correct version |
|---|---|---|
| `1bunny` | invalid | `bunny1` |
| `_bunny` | valid | — |
| `$bunny` | valid | — |
| `-bunny` | invalid | `bunny` |
| `@bunny` | invalid | `bunny` |
| `bunnyName` | valid | — |

---

## 3. Predict the output, then run the code

```javascript
console.log(pet); // undefined
var pet = "lucy";

console.log(animal); // ReferenceError (still in the Temporal Dead Zone)
let animal = "tom";
```

**Explanation:** `var` is hoisted and initialized with `undefined`, while `let` is hoisted but not initialized, creating a Temporal Dead Zone until the declaration is reached.

---

## 4. Write two short examples

A local scope variable inside a function called `animalName`.

```javascript
let oldAnimal = "Tortoise"; // global variable, accessible across the whole JS environment

function animalName() {
  let newAnimal = "bunny"; // local variable inside a function
  console.log(newAnimal, oldAnimal);
}
```

---

## 5. Declare a variable named `bunny` and assign it an object

```javascript
const bunny = {
  name: "Lucy", // string
  age: 20, // number
  isHappy: true, // boolean
};
console.log(bunny.name);
console.log(bunny.age);
console.log(bunny.isHappy);
```

---

## 6. For each value below, print the value and its type using `typeof`

```javascript
console.log(typeof 3.14); // number
console.log(typeof "Lucy"); // string
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object
console.log(typeof Symbol("lucy")); // symbol
console.log(typeof { name: "Lucy" }); // object
console.log(typeof ["Lucy", "Tom"]); // object
```

---

## 7. Create an array called `mixedDataTypes`

Hold at least one boolean, one number, one string, `null`, `undefined`, and one object. Print the array and its length.

```javascript
const mixedDataTypes = [true, 10, "Lucy", null, undefined, { name: "Lucy" }];
console.log(mixedDataTypes);
console.log(mixedDataTypes.length); // 6
```

---

## 8. Write a function `sumBunnies`

No parameters. Inside it, create `blackBunnies = 10` and `whiteBunnies = 20`, add them, and return the total. Call the function and print the result.

```javascript
function sumBunnies() {
  const blackBunnies = 10;
  const whiteBunnies = 20;
  let total = 0;
  return (total = whiteBunnies + blackBunnies);
}

const totalNumberOfBunnies = sumBunnies();
console.log(totalNumberOfBunnies);
```

---

## 9. Rewrite `sumBunnies` to take two parameters

Call it with `sumBunnies(10, 20)` and with `sumBunnies(7, 3)`.

```javascript
function sumBunnies2(blackBunnies, whiteBunnies) {
  return blackBunnies + whiteBunnies;
}
const result1 = sumBunnies2(10, 20);
const result2 = sumBunnies2(7, 3);
console.log(result1);
console.log(result2);
```

---

## 10. Rewrite question 9 as an anonymous function and an arrow function

```javascript
const sumBunnies3 = function (blackBunnies, whiteBunnies) {
  return blackBunnies + whiteBunnies;
}; // anonymous function stored in a variable

const sumBunnies4 = (blackBunnies, whiteBunnies) => {
  return blackBunnies + whiteBunnies;
}; // arrow function stored in a variable
```

---

## 11. Write an IIFE

Adds 10 black bunnies and 20 white bunnies and prints the total as soon as the file runs. Do not call it by name afterwards.

```javascript
// IIFE --> Immediately Invoked Function Expression
(function (blackBunnies = 10, whiteBunnies = 20) {
  console.log(blackBunnies + whiteBunnies);
})();
```

---

## 12. Create an array called `bunnies` with six bunny names

```javascript
const bunnies = ["Lucy", "Bisco", "Sweaty", "Hairy", "Sweet", "Feathers"];
bunnies.unshift("Mario");
bunnies.push("Luigi");
bunnies.splice(1, 1);
console.log(bunnies);
```

---

## 13. Using this array

```javascript
const bunnies = ["Lucy", "Tom", "Molly", "Bella"];
console.log(bunnies[0]); // first item
console.log(bunnies[bunnies.length - 1]); // last item
console.log(bunnies.findIndex((value) => value === "Tom")); // index of Tom
const copyOfBunnies = [...bunnies]; // copy of the array
```

---

## 14. Loop through `bunnies` with a for loop

Print: "Bunny Lucy is scheduled for a checkup today."

```javascript
for (let i = 0; i <= bunnies.length - 1; i++) {
  console.log(`Bunny ${bunnies[i]} is scheduled for a checkup today.`);
}
```

---

## 15. Using this nested array

```javascript
const nestedArrays = [
  ["Lucy", "Tom"],
  ["Molly", "Bella"],
];

console.log(nestedArrays[0][0]); // Lucy
console.log(nestedArrays[1][1]); // Bella

for (let i = 0; i <= nestedArrays.length - 1; i++) {
  for (let a = 0; a <= nestedArrays[i].length - 1; a++) {
    console.log(nestedArrays[i][a]); // all bunny names in the nested array
  }
}
```

---

## 16. Create a JavaScript object called `bunny`

Convert it to JSON, store it in `bunnyJSON`, and print `bunnyJSON`.

```javascript
const bunny = {
  name: "Lucy",
  age: 20,
  isHappy: true,
};
const bunnyJSON = JSON.stringify(bunny);
console.log(bunnyJSON);
```

---

## 17. Start with this JSON string

```javascript
let bunnyJSON = '{"name":"Lucy","age":3,"isHappy":true}';
bunnyJSON = JSON.parse(bunnyJSON);
console.log(bunnyJSON.name);
console.log(bunnyJSON.age);
```

---

## 18. Given

```javascript
let bunny_age = 3;
let dog_age = "3";

console.log(bunny_age == dog_age); // true
console.log(bunny_age === dog_age); // false
console.log(bunny_age != dog_age); // false
console.log(bunny_age !== dog_age); // true
```

**The difference between `==` and `===`:** `==` only checks the value and ignores the data types, while `===` checks both the value and the data type.

---

## 19. Create two arrays and compare their lengths

```javascript
const bunnies = ["Lucy", "Eva", "Feathers"];
const dogs = ["Bingo", "Brother"];
console.log(bunnies.length <= dogs.length); // false

if (bunnies.length <= dogs.length) {
  console.log("There are more dogs than bunnies");
} else {
  console.log("There are more bunnies than dogs");
}
```

---

## 20. A bunny's health can be 'healthy', 'sick', or anything else

Write this check three ways: if/else if/else, switch statement, ternary operator.

```javascript
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

// switch statement
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

// ternary operator
aNewBunny.isHealthy
  ? console.log("Bunny is healthy")
  : console.log("Bunny is sick");
```

---

## 21. Write a function that takes a number and uses a ternary operator to return 'even' or 'odd'

Test it with 4, 7, and 0.

```javascript
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
```

---

## 22. Write a for loop and a while loop that print Number 0 through Number 9

```javascript
// For loop
for (let i = 0; i <= 9; i++) {
  console.log(i);
}

// While loop
let a = 0;
while (a <= 9) {
  console.log(a);
  a++;
}
```

---

## 23. Write a while loop and a for loop that count down from 9 to 1

```javascript
// While loop
let b = 9;
while (b >= 0) {
  console.log(b);
  b--;
}

// For loop
for (let i = 9; i >= 0; i--) {
  console.log(i);
}
```

---

## 24. Write `sumBunnies` to throw an error if either argument is not a number

Wrap a call to `sumBunnies(10, 'twenty')` in try/catch and print the error message.

```javascript
function sumBunnies(blackBunnies, whiteBunnies) {
  if (typeof blackBunnies != "number" || typeof whiteBunnies != "number") {
    throw new Error("Bunnies must be a number");
  }
  return blackBunnies + whiteBunnies;
}

try {
  sumBunnies(10, "twenty");
} catch (error) {
  console.log(error.message);
}
```

---

## 25. Using operators, write one small program

- Assigns `blackBunnies = 10` and `whiteBunnies = 5`
- Prints whether they are equal (`===`)
- Prints the total (`+`)
- Prints whether there are more than 12 bunnies in total
- Prints `'Yes'` or `'No'` with a ternary if the total is greater than 12

```javascript
const blackBunnies = 10;
const whiteBunnies = 5;
const total = blackBunnies + whiteBunnies;
console.log(blackBunnies === whiteBunnies);
console.log(total);
if (total > 12) {
  console.log("There are more than 12 bunnies");
}
console.log(total > 12 ? "Yes" : "No");
```

---

# Brain Teasers

## Brain Teaser 1 — The quiet loop

What does this print, and why does it stop?

```javascript
let carrots = 3;

while (carrots) {
  console.log("munch");
  carrots--;
}
```

**Answer:** This prints "munch" three times because the value of `carrots` is greater than zero. The loop stops when the value of `carrots` is less than or equal to 0. If we delete the line `carrots--;`, we run into an infinite loop because the value of `carrots` will remain truthy since it stays greater than 0.

---

## Brain Teaser 2 — For vs while, same farm

```javascript
const bunnies = ["Lucy", "Tom", "Molly", "Bella", "Mario", "Luigi"];
// Print only the bunnies whose names have more than 4 letters.
```

**For loop solution:**

```javascript
for (let i = 0; i <= bunnies.length - 1; i++) {
  if (bunnies[i].length >= 4) {
    console.log(bunnies[i]);
  }
}
```

**While loop solution:**

```javascript
let ab = 0;
while (ab <= bunnies.length - 1) {
  if (bunnies[ab].length >= 4) {
    console.log(bunnies[ab]);
  }
  ab++;
}
```

---

## Brain Teaser 3 — Nested checkup

```javascript
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
```

**Solution:**

```javascript
let numbering = 0;
for (let i = 0; i <= nestedArrays.length - 1; i++) {
  for (let a = 0; a <= nestedArrays[i].length - 1; a++) {
    numbering += 1;
    console.log(`${numbering}. ${nestedArrays[i][a]}`);
  }
}
```

---

## Brain Teaser 4 — Loop + condition + function

Write a function `countHappyBunnies(bunnies)` that takes an array of objects:

```javascript
const bunnies = [
  { name: "Lucy", isHappy: true },
  { name: "Tom", isHappy: false },
  { name: "Molly", isHappy: true },
];
```

**Solution:**

```javascript
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
```

---

## Brain Teaser 5 — The loop that almost lies

**Snippet A (works):**

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Outcome: 0, 1, 2, 3, 4
```

**Snippet B (broken — infinite loop):**

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
}
// Outcome: infinite loop
```

**Fixed Snippet B:**

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
// Outcome: 0, 1, 2, 3, 4
```

**When to use `for` vs `while`:** Use `for` when you know the size of the dataset to loop through. Use `while` when the outcome is undetermined or when you need to loop based on a condition rather than a fixed number of iterations.
