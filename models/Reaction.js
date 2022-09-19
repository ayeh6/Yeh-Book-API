const { Schema, model} = require('mongoose');

const reactionSchema = new Schema({
   reactionBody: {
      type: String,
      required: true,
      maxLength: 255,
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
      getters: true,
   },
   id: false,
});

function formatTimestamp(createdAt) {
   const date = createdAt.toLocaleDateString([], {dateStyle: 'long'});
   const time = createdAt.toLocaleTimeString([], {timeStyle: 'short'});
   return `${date} at ${time}`;
};

module.exports = model('Reaction', reactionSchema);