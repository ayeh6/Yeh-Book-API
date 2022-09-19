const {Schema, model} = require('mongoose');

const userSchema = new Schema({
   username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: /^[a-z\d_\.-]+@[a-z\d\.-]+\.[a-z\.]{2,6}$/,
   },
   thoughts: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Thought',
      }
   ],
   friends: [
      {
         type: Schema.Types.ObjectId,
         ref: 'User',
         default: [],
      }
   ]
},
{
   timestamps: true,
   toJSON: {
      virtuals: true,
   },
   id: false,
});

userSchema.virtual('friendCount').get(() => {
   return this.friendsIds.length;
});

module.exports = model('User', userSchema);