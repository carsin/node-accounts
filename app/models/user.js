const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    local: {
        email: String,
        username: String,
        password: String,
    }
});

// METHODS ======================
userSchema.methods.generateHash = function(password) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) console.log(err);
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) console.log(err);
            console.log("created hash");
            return hash;
        });
    });
}

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);
