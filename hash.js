import bcrypt from "bcrypt";

const plainPassword = "anahowahadak";

// Generate a salt
const saltRounds = 10;

// Hash the password with the salt
bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error("Error hashing password:", err);
    return;
  }

  // Store the hashed password in the database
  console.log("Hashed password:", hashedPassword);
});
