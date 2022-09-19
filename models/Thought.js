const {Schema, model} = require('mongoose');
const {ObjectId} = require('mongodb');

const reactionSchema = new Schema(
   {
       reactionId: {
           type: Schema.Types.ObjectId,
           default: new ObjectId(),
       },
       reactionBody: {
           type: String,
           required: true,
           maxLength: 280,
       },
       username: {
           type: String,
           required: true,
       },
       createdAt: {
           type: Date,
           default: Date.now(),
           get: formatTimestamp,
       },
   },
   {
       toJSON: {
           getters: true
       },
       id: false,
   }
);

const thoughtSchema = new Schema({
   thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
      get: formatTimestamp,
   },
   username: {
      type: String,
      required: true,
   },
   reactions: [reactionSchema],
},
{
   toJSON: {
      virtuals: true,
      getters: true,
   },
   id: false,
});

thoughtSchema.virtual('reactionCount').get(function() {
   return this.reactions.length;
});

function formatTimestamp(createdAt) {
   const date = createdAt.toLocaleDateString([], {dateStyle: 'long'});
   const time = createdAt.toLocaleTimeString([], {timeStyle: 'short'});
   return `${date} at ${time}`;
};

module.exports = model('Thought', thoughtSchema);
