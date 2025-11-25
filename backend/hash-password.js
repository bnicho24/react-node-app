const bcrypt = require('bcryptjs');

bcrypt.hash('test@123', 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});