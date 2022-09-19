const { User, Thought } = require('./../../models');

const getAllUsers = async (req, res) => {
   try {
      const usersQuery = await User.find();
      res.status(200).json(usersQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
}

const createUser = async (req, res) => {
   try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

const getUserById = async (req, res) => {
   try {
      const userQuery = await User.findById(req.params.userId)
         .populate('thoughts')
         .populate('friends');
      res.status(200).json(userQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

const updateUserById = async (req, res) => {
   const userId = req.params.userId;
   const updatedUserBody = req.body;
   try {
      const updateUserQuery = await User.findByIdAndUpdate(
         userId,
         updatedUserBody,
         {
            new: true,
         },
      );
      res.status(200).json(updateUserQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

const deleteUserById = async (req, res) => {
   try {
      const userId = req.params.userId;
      const deleteUserQuery = await User.findByIdAndDelete(userId);
      await Thought.deleteMany({ username: deletedUserQuery.username });
      res.status(200).json(deletedUserQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

const addFriend = async (req, res) => {
   const userId = req.params.userId;
   const friendId = req.body.friendId;

   try {
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
   };
};

const deleteFriend = async (req, res) => {
   const userId = req.params.userId;
   const friendId = req.body.friendId;

   try {
      const user = await User.findByIdAndUpdate(
         req.params.userId,
         {
            $pull: {
               friends: req.params.friendId,
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
   };
};

module.exports = {
   getAllUsers,
   createUser,
   getUserById,
   updateUserById,
   deleteUserById,
   addFriend,
   deleteFriend,
};