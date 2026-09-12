# A school admin is using your API. She reports this: "I created two students both named Ada. When I search by name I get a weird result. When I update Ada's age, Postman still shows the old age. When I look up a student with a fake id like abc123, the server crashes into a 500. When I look up a valid-looking id that does not exist, I still get 200. And when I delete someone who was never in the database, it still says 'deleted successfully'." Your job is to explain why those things happen in the current code, then extend the API — without breaking the routes that already exist.

## Part A

1. GET /get-student-by-name?name=Ada uses Student.find({ name }).
   If two Adas exist, what is the shape of the JSON the client actually receives?
   Would findOne behave differently? When would you use each?

- Answer:
  - 1a: if there are two Ada in the database, the API returns/send both Data object in an Array
  - 1b: if we use find the API returns and array but if we use findOne the APi returns a single data object. We should use find when we wont to get multiple data whilst we should use findeOne when we want to get a single data object e.g find a single user using the user ID

---

2. That same route is case-sensitive and requires an exact name.
   What happens if the admin searches ada or Ada (trailing space)?
   Research how to make a MongoDB/Mongoose name search case-insensitive without fetching every student into Node and filtering in JavaScript.

- Answer
  - 2a: If the user type ada in lowercase or Ada with a trailing space, without any form of validation middleware the database tries to find the user with the exact case or trailing case and if there is no match it returns null/undefined
    -2b: to search in mongoDb without case sensitive, Mongooose provides us with a $regex filtering parameter it accept the value and a character i to indicate case insensitive
  ```javascript
  //query to search users case insensitive
  User.find({$or:[{
      username:{
          $regex: q // for the search parameter,
          $options: "i" // to indicate case insensitiveness,
      }
  }]})
  ```

---

3. PUT /update-student/:id uses findByIdAndUpdate(..., { new: true }).
   The admin swears she still sees the old document. Give two possible reasons this can happen:

one that is about how she is calling the endpoint (params vs body, method, URL)
one that is about Mongoose update options (research new, runValidators, and what happens to fields she did not send in the body)

- Answer
  - 3a: case : senerio one, the client might be using a different method to update the age hence they are suppose to get a Method not allowed error. scenario 2: the client might be sending a malformed user id which intend my leade to a Object cast error where mongoose cant cast the id to an object id, scenario 3: the client might be sending the id in the query or bodyinstead of the params and this will lead to a user not found error. scenario 4 the age data might not be updated in the request body by the client or might not be included at all.
  - 3b: the new key provide to the second object of the mongoose query takes a boolean value with tells mongoose to return the updated document after an update, it is usually available in queries like findByOneAndUpdate, it is deprecated in the new version of mongoose and replace with returnDocument which you provide a value of "before" or "after".
    runValidators on the other hand validates the value in the request body against the schema before saving it in the database. if a required field is left out of the body an error is thrown to tell the server that a field is required

---

4. GET /get-student/:id

Valid ObjectId, student exists → ?
Valid ObjectId, student does not exist → what does findById return, and what status does your code send?
Invalid id such as abc123 → why is this a 500 and not a 404?
Research: CastError vs "document not found". They are not the same bug.

- Answer
  - 4a: if student exist we get

    ```javascript
    {
    message:"Student fetched successfully",
    student:{
        name:"Ada",
            age:20,
            email:"ada@gmail.com",
            phone:"+2348122343843",
            address:"Lagos,Nigeria",
            course:"CSC101",
            institution :"TechyJaunt"
    }
    }
    ```

  - 4b: when student doesnt exist findById returns null, we then return a 404 not found status code

  - 4c: invalid ID returns a 500 and not a 404 because Mongoose is unable to convert the string to an ObjectId type require by MongoDb database, CastError is a case a string Id cant be converted into and Object while document not found is a case where by the id is correct but the document is not attached or available for the ID

---

5. mongoose.model("Student", studentSchema)
   What is the actual collection name in MongoDB Compass / mongosh?
   (Hint: it is probably not "Student".) Explain why that matters if someone writes a raw Mongo query against the wrong collection and thinks "the API is empty".

- Answer
  - 5: the actual collection name in MongoDb/Mongosh is Students with an "s" at the end, this matters because mongodb treats every collection as plural i.e not a single data but multiple data entries.
    the reason someone might conclude the collection as no data is because of the thoughts that creating a model with their initial model key would be stored the same way on mongodb

---

6. Why does POST /create-student fail (or save undefined fields) if the client forgets Content-Type: application/json?
   Which one line in app.js is responsible for making req.body work at all?

- Answer
  - 6: because express expect the cleint to specify the type of data they are sending to the server hence why we need the content-type value set in the header. the line responsible for making req.body works is the line where we still the body-parser middleware. we can use express to set it or we can use external library like body-parser library

```javascript
app.use(express.json());
```

## Part B

Keep every existing route working. Add the following. Do not invent extra routes beyond what is asked.

1. GET /search-students
   The current name route is not good enough for a real search box.

- Read the search text from a query parameter named q (not a URL param, not the body).
  Match students whose name or email or course contains q, case-insensitive.
- If q is missing or empty, respond with 400 and a clear message. Do not return the whole database.
- Return an array (even if only one student matches). Status 200.
- If none match, still return 200 with an empty array — not 404. Research why list/search endpoints usually do that.

- Answer

  ```javascript
  const Student = require("../models/student.model.js");
  const searchStudents = async (req, res, next) => {
    const { q } = req.query;
    try {
      if (!q) {
        res.status(400).json({
          message: "Search term is undefined",
        });
      }
      const students = await Student.find({
        $or: [
          {
            name: {
              $regex: q,
              $options: "i",
            },
          },
          {
            email: {
              $regex: q,
              $options: "i",
            },
          },
          {
            course: {
              $regex: q,
              $options: "i",
            },
          },
        ],
      });

      if (!students) {
        // this if only check if it is null or undefined, it wont check if the array -> [] is empty
        res.status(404).json({
          message: "Students not found",
        });
      }
      res.status(200).json({
        message: "student fetched successfully",
        students,
      });
    } catch (error) {
      next(error);
    }
  };
  ```

  ***
  2. Harden GET /get-student/:id (edit the existing route)

- If the id is not a valid MongoDB ObjectId → 400, message explaining the id is invalid.
  Research mongoose.Types.ObjectId.isValid — and also research why isValid alone is not perfect. Mention that limitation in a code comment.
- If the id is valid but no student exists → 404, not 200 with student: null.
  Only return 200 when a real student is found.

- Answer
  - 2a:

  ```javascript
  const Student = require("../models/student.model.js");
  function safelyValidateObjectId(id) {
    // 1. Check if the value fits the basic format requirements
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return false;
    }
    // 2. Cast and verify structural integrity
    const castedId = new mongoose.Types.ObjectId(id);
    return castedId.toString() === id;
  }

  const getStudentById = async (req, res, next) => {
    const { id } = req.params;
    try {
      if (!id || !safelyValidateObjectId(id)) {
        res.status(400).json({
          message: "Invalid student id",
        });
      }
      const student = await Student.findOne(id);
      if (!student) {
        res.status(404).json({
          message: "student not finde",
        });
      }

      res.status(200).json({
        message: "Student retrieved successfully",
        student,
      });
    } catch (err) {
      next(err);
    }
  };
  ```

  - 2b: While highly useful, isValid is not perfect because it returns true for any 12-character string, 24-character hexadecimal string, or 12-byte Buffer. It only checks if the format is technically capable of being an ObjectId, not whether the string actually represents a real document in your database or even if it was generated as a true ObjectId. For example, the string "123456789012" or "invalidhexstringwhichis24" might return true.

---

3. PATCH /students/:id/course
   The school does not want a full replace-all-fields update for this.

Change only the course field.
Send the new course in the JSON body as { "course": "..." }.
If course is missing or an empty string → 400.
If the student does not exist → 404.
The JSON response must contain the updated student (the new course must be visible). Research which Mongoose option makes that happen.
Research runValidators. Turn it on for this update. Then add a minlength (or enum) on course in the schema so a 1-character course is rejected. Show that this rejection is 400, not 500.

- Answer
  - 3:

  ```javascript
  const mongoose = require("mongoose");
  //student schema
  const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phone: String,
    address: String,
    course: {
      type: String,
      minlength: 400,
    },
    institution: String,
  });
  studentSchema.index(
    { email: 1 },
    {
      unique: true,
      partialFilterExpression: { email: { $exists: true } }, // partialFileter if the field is Optional
    },
  );
  const Student = mongoose.model("Student", studentSchema);
  //updateStudent controller
  const updateStudentCourse = async (req, res, next) => {
    const { id } = req.params;
    const { course } = req.body;
    try {
      if (!id) {
        res.status(400).json({
          message: "Stuent id is required",
        });
      }
      if (!course) {
        res.status(400).json({
          message: "Course is required",
        });
      }
      const studentUpdate = await Student.findByIdAndUpdate(
        id,
        { course: course },
        { returnDocument: "after", runValidators: true },
      );
      if (!studentUpdate) {
        res.status(404).json({
          message: "Student not found",
        });
      }
      res.status(200).json({
        message: "Course updated successfully",
        student: studentUpdate,
      });
    } catch (err) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        res.status(400).json({
          message: `${duplicateField} already exist`,
        });
      }
      next(err);
    }
  };

  //student update course route
  app.patch("/update-student/:id", updateStudentCourse);
  ```

---

4. Unique email (schema + create route)
   Right now two students can be created with the same email.

Make email unique in the schema. Research whether just adding unique: true is enough, or whether you also need an index / what error Mongo throws on duplicate key (11000).
On duplicate email, POST /create-student must respond 409 Conflict, not 500.
Creating a student with missing name or missing email must be 400, not 200 with empty fields. Put required: true on those two schema paths.

- Answer
  - 4a:
    Mongo throws Err E11000 duplicate value at Student.email

  ```javascript
  const mongoose = require("mongoose");
  //student schema
  const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age: Number,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: String,
    address: String,
    course: {
      type: String,
      minlength: 400,
    },
    institution: String,
  });
  studentSchema.index(
    { email: 1 },
    {
      unique: true,
      partialFilterExpression: { email: { $exists: true } }, // partialFileter if the field is Optional
    },
  );
  ```

---

5. 5. Honest delete
      Edit DELETE /delete-student/:id:

Invalid id → 400
Valid id, no student → 404 ("already gone" is not a successful delete)
Real delete → 200 (or 204 — pick one, and justify the status code in a short comment).

- Answer:
  - 5:
  ```javascript
  const Student = require("../models/student.model.js");
  //controller
  const deleteStudent = async (req, res, next) => {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).json({
          message: "student ID is required",
        });
      }
      const deleteStudent = await Student.deleteById(id);
      if (!deleteStudent) {
        res.status(404).json({
          message: "student not found",
        });
      }
      res.status(204).json({
        //status 200 only specify that the request was okay while status code 204 indicate the request was okay and no content to be sent
        message: "Student deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  };
  ```
