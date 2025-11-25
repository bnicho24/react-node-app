const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res, next) => {
  db.query(
    "SELECT id, name, role, email, created_at, profile_picture FROM users",
    (err, results) => {
      if (err) return next(err);
      res.json(results);
    }
  );
};

exports.register = async (req, res, next) => {
  const { name, role, email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return next(err);
    if (results.length > 0) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date();

    db.query(
      "INSERT INTO users (name, role, email, password, created_at) VALUES (?, ?, ?, ?, ?)",
      [name, role, email, hashedPassword, createdAt],
      (err) => {
        if (err) return next(err);
        res.json({ message: "User registered successfully" });
      }
    );
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) {
      const error = new Error("User not found");
      error.statusCode = 401;
      return next(error);
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return next(error);
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret_key", { expiresIn: "1h" });
      res.json({ token });
    });
  });
};

exports.getProfile = (req, res, next) => {
  db.query(
    "SELECT id, name, role, email, profile_picture, created_at FROM users WHERE id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return next(err);
      if (results.length === 0) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }
      res.json(results[0]);
    }
  );
};

exports.updateProfile = (req, res, next) => {
  const { name, role, email } = req.body;
  const userId = req.user.id;
  db.query(
    "UPDATE users SET name = ?, role = ?, email = ? WHERE id = ?",
    [name, role, email, userId],
    (err) => {
      if (err) return next(err);
      res.json({ message: "Profile updated successfully" });
    }
  );
};

exports.updateProfilePicture = (req, res, next) => {
  const userId = req.user.id;
  if (!req.file) {
    const error = new Error("No file uploaded");
    error.statusCode = 400;
    return next(error);
  }

  const imagePath = `/uploads/${req.file.filename}`;
  db.query("UPDATE users SET profile_picture = ? WHERE id = ?", [imagePath, userId], (err) => {
    if (err) return next(err);
    res.json({ message: "Profile picture updated successfully", profile_picture: imagePath });
  });
};

exports.updatePassword = async (req, res, next) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  db.query("SELECT * FROM users WHERE id = ?", [userId], async (err, results) => {
    if (err) return next(err);
    if (results.length === 0) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      const error = new Error("Current password is incorrect");
      error.statusCode = 400;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId], (err) => {
      if (err) return next(err);
      res.json({ message: "Password updated successfully" });
    });
  });
};