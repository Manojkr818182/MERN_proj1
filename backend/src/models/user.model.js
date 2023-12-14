const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
    {   
        first_name: {
            type: String,
            default: ""
        },
        last_name: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: "",
            index: true 
        },
        password: {
            type: String,
            default: ""
        },
        server_token: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;