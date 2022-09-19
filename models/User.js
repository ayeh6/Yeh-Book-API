const {Schema, model} = require('mongoose');

const userSchema = new Schema({
   username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
   },
   email: {
      type: String,
      unique: true,
      required: [true, 'Please provide an email'],
      match: /^[a-z\d_\.-]+@[a-z\d\.-]+\.[a-z\.]{2,6}$/,
   },
   thoughtsIds: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Thought',
      }
   ],
   friendsIds: [
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