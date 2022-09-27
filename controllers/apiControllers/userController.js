const { all } = require('../../routes/apiRoutes/userRoutes');
const { User, Thought } = require('./../../models');

const getAllUsers = async (req, res) => {
   try {
      //find all users
      const usersQuery = await User.find();
      res.status(200).json(usersQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   }
}

const createUser = async (req, res) => {
   try {
      //new user body
      const newUserBody = req.body;

      //add new user with this body
      const newUserQuery = await User.create(newUserBody);
      res.status(200).json(newUserQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   }
}

const getUserById = async (req, res) => {
   try {
      const userId = req.params.userId;

      //find user by id, populate thoughts and friends
      const userQuery = await User.findById(userId)
         .populate('thoughts')
         .populate('friends');

      res.status(200).json(userQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   }
}

const updateUserById = async (req, res) => {
   try {
      //variables
      const userId = req.params.userId;
      const updatedUserBody = req.body;

      //save old user
      const oldUserQuery = await User.findById(userId);

      //update user
      const updateUserQuery = await User.findByIdAndUpdate(
         userId,
         updatedUserBody,
         {
            new: true,
         },
      );

      //update username in all thoughts and reactions
      if (updatedUserBody.username) {
         const allThoughts = await Thought.find();
         //for every thought
         for(let i=0; i<allThoughts.length; i++) {
            if(allThoughts[i].username === oldUserQuery.username) {
               allThoughts[i].username = updatedUserBody.username;
            }
            //for every reaction in this thought
            for(let j=0; j<allThoughts[i].reactions.length; j++) {
               if(allThoughts[i].reactions[j].username === oldUserQuery.username) {
                  allThoughts[i].reactions[j].username = updatedUserBody.username;
               }
            }
         }
      }

      res.status(200).json(updateUserQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   }
}

const deleteUserById = async (req, res) => {
   try {
      //variable
      const userId = req.params.userId;

      //delete user
      const deleteUserQuery = await User.findByIdAndDelete(userId);

      //delete thoughts with deleted user's username
      await Thought.deleteMany({ username: deleteUserQuery.username });

      res.status(200).json(deletedUserQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   }
}

const addFriend = async (req, res) => {
   try {
      //variables
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      //find user, add friendId to friends
      const user = await User.findByIdAndUpdate(
         userId,
         {
            $addToSet: {
               friends: friendId,
            },
         },
         {
            new: true,
         },
      );
      res.status(200).json(user);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   }
}

const deleteFriend = async (req, res) => {
   try {
      //variables
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      //find user, pull friend with friendId
      const user = await User.findByIdAndUpdate(
         userId,
         {
            $pull: {
               friends: friendId,
            },
         },
         {
            new: true,
         },
      );

      res.status(200).json(user);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   }
}

module.exports = {
   getAllUsers,
   createUser,
   getUserById,
   updateUserById,
   deleteUserById,
   addFriend,
   deleteFriend,
}