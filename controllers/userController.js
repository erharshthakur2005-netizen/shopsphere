const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../modules/User");


// ========================================
// REGISTER USER
// ========================================

const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    // Validation
    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });

    }


    if (password.length < 6) {

      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters"
      });

    }


    // Check existing user
    const existingUser =
      await User.findOne({
        email: email.toLowerCase()
      });


    if (existingUser) {

      return res.status(409).json({
        success: false,
        message: "User already exists"
      });

    }


    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    // Save to MongoDB
    const user =
      await User.create({

        name,

        email:
          email.toLowerCase(),

        password:
          hashedPassword

      });


    res.status(201).json({

      success: true,

      message:
        "Registration successful",

      user: {

        id: user._id,

        name: user.name,

        email: user.email,
        role: user.role

      }

    });


  } catch (error) {

    console.error(
      "Register Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Server error"

    });

  }

};


// ========================================
// LOGIN USER
// ========================================

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required"

      });

    }


    // Find user
    const user =
      await User.findOne({

        email:
          email.toLowerCase()

      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    // Check password
    const passwordMatch =
      await bcrypt.compare(

        password,

        user.password

      );


    if (!passwordMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    // Generate JWT
    const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);


    res.json({

      success: true,

      message:
        "Login successful",

      token,

     user: {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
}

    });


  } catch (error) {

    console.error(
      "Login Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Server error"

    });

  }

};


module.exports = {

  registerUser,

  loginUser

};
