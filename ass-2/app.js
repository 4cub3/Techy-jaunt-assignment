const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 4555;

app.use(express.json());
function safelyValidateObjectId(id) {
  // 1. Check if the value fits the basic format requirements
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  // 2. Cast and verify structural integrity
  const castedId = new mongoose.Types.ObjectId(id);
  return castedId.toString() === id;
}
const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/techSchoolApp");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

databaseConnection();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, required: true },
  phone: String,
  address: String,
  course: {
    type: String,
    enum: ["Mongo123", "CSC202", "FRED109"],
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

app.post("/create-student", async (req, res) => {
  const { name, age, email, phone, address, course, institution } = req.body;
  try {
    if (!name || !email) {
      res.status(400).json({
        message: "Email and name are required",
      });
    }
    const student = new Student({
      name,
      age,
      email,
      phone,
      address,
      course,
      institution,
    });
    await student.save();
    return res
      .status(200)
      .json({ message: "Student created successfully", student });
  } catch (error) {
    if (error.name === "ValidationError") {
      Object.keys(err.errors).forEach((field) => {
        const detail = err.errors[field];
        res.status(400).json({
          message: detail.message,
        });
      });
      return;
    }
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      res.status(409).json({
        message: `${duplicateField} already exist`,
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get-students", async (req, res) => {
  try {
    const students = await Student.find();
    return res
      .status(200)
      .json({ message: "Students fetched successfully", students });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get-student/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || !safelyValidateObjectId(id)) {
      res.status(400).json({
        message: "Invalid User ID",
      });
    }
    const student = await Student.findById(id);
    if (!student) {
      res.status(404).json({
        message: "student not found",
      });
    }
    return res
      .status(200)
      .json({ message: "Student fetched successfully", student });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/update-student/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, email, phone, address, course, institution } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { name, age, email, phone, address, course, institution },
      { new: true },
    );
    return res
      .status(200)
      .json({ message: "Student updated successfully", student });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get-student-by-name", async (req, res) => {
  const { name } = req.query;
  try {
    const student = await Student.find({ name });
    return res
      .status(200)
      .json({ message: "Student fetched successfully", student });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || !safelyValidateObjectId(id)) {
      res.status(400).json({
        message: "Invalid student ID",
      });
    }
    const deleteStudent = await Student.findByIdAndDelete(id);
    if (!deleteStudent) {
      res.status(404).json({
        message: "student not found",
      });
    }
    res.status(204).json({
      //status 200 only specify that the request was okay while status code 204 indicate the request was okay and no content to be sent
      message: "Student deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/search-student", async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({
      message: "Search term is not provided",
    });
  }
  try {
    const student = await Student.find({
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
    if (!student) {
      res.status(404).json({
        message: "Can't find students",
      });
    }
    res.status(200).json({
      message: "Students fetched successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
});

app.patch("/students/:id/course", async (req, res, next) => {
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
    if (!studentUpdate.course) {
      res.status(400).json({
        message: "Unable to get course",
      });
    }
    res.status(200).json({
      message: "Course updated successfully",
      student: studentUpdate,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      Object.keys(err.errors).forEach((field) => {
        const detail = err.errors[field];
        res.status(400).json({
          message: detail.message,
        });
      });
      return;
    }
    res.status(500).json({
      message: "internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.js;
