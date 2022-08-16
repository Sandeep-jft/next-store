const { Schema, models, model } = require("mongoose");
var bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    email:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    role:{
        type: String,
        enum : ['USER','ADMIN','ROOT'],
        default: 'USER'
    }
},{
    timestamps:true
})

userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
});
  
userSchema.methods.compareUserPassword = async function compareUserPassword(data) {
    return bcrypt.compare(data, this.password);
};

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const user = models.user || model('user',userSchema);

export default user;