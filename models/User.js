const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  marketName: {
    type: String,
  },

  mobile: {
    type: String,
    required: false,
  },
  waId: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  branchIds: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'branch' }],
  },
  defaultBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'branch',
  },
  accountType: {
    type: {},
  },
  defaultCharges: {
    type: Array,
  },
  extraDeliveryCharge: {
    type: Array,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// userSchema.virtual('organisations', {
//   ref: 'Organisation',
//   localField: '_id',
//   foreignField: 'owner',
// });
// userSchema.virtual('profiles', {
//   ref: 'Profile',
//   localField: '_id',
//   foreignField: 'user',
// });

// userSchema.statics.findByCredentials = async (email, password) => {
//   user = await User.findOne({ email });
//   // console.log(user)
//   if (!user) {
//     throw new Error('Unable to find a user with that email');
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   // console.log(isMatch)

//   if (!isMatch) {
//     throw new Error('Wrong Password');
//   }

//   return user;
// };

// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, config.get('jwtToken'), {
//     expiresIn: 3600,
//   });
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

// userSchema.methods.toJSON = function () {
//   user = this;
//   userObject = user.toObject();
//   delete userObject.password;
//   delete userObject.tokens;
//   return userObject;

//   // const user = {name: this.name, age: this.age, email:this.email }
//   // return user
// };

// // HASH the password

// userSchema.pre('save', async function (next) {
//   const user = this;

//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
// });

// userSchema.pre('remove', async function (next) {
//   const user = this;
//   next();
// });

const User = mongoose.model('user', userSchema);

module.exports = User;
