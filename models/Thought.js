const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema({
   thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 255,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
      get: formatTimestamp,
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   reactions: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Reaction',
         default: [],
      }
   ]
},
{
   toJSON: {
      virtuals: true,
      getters: true,
   },
   id: false,
});

thoughtSchema.virtual('reactionCount').get(() => {
   return this.reactions.length;
});

function formatTimestamp(createdAt) {
   const date = createdAt.toLocaleDateString([], {dateStyle: 'long'});
   const time = createdAt.toLocaleTimeString([], {timeStyle: 'short'});
   return `${date} at ${time}`;
};

module.exports = model('Thought', thoughtSchema);
