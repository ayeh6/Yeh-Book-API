const {User, Thought} = require('./../models');
const userSeed = require('./users');
const thoughtSeed = require('./thoughts');
const mongoose = require('mongoose');
require('dotenv').config();

const seeder = async () => {
   try {
      await mongoose.connect(process.env.DB_HOST);
      console.log("connected");

      await Thought.deleteMany();
      await User.deleteMany();
      console.log("cleared database");

      await User.insertMany(userSeed);

      const thoughts = await Thought.insertMany(thoughtSeed);

      for(let i=0; i<thoughts.length; i++) {
         await User.findOneAndUpdate(
            {
               username: thoughts.username
            },
            {
               $push: {thoughts: thoughts._id}
            },
            {
               new: true
            }
         );
      }
      console.log("successfully seeded");
   } catch(error) {
      console.error(error);
   }
   process.exit(0);
}

seeder();