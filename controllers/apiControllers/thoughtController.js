const { User, Thought, Reaction } = require('../../models');

const getAllThoughts = async (req, res) => {
   try {
      const thoughtsQuery = await Thought.find();
      res.status(200).json(thoughtsQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
}

const createThought = async (req, res) => {
   const thoughtText = req.body.thoughtText;
   const username = req.body.username;

   try {
      const userQuery = await User.findOne({
         username: username,
      });

      const newThought = {
         thoughtText: thoughtText,
         userId: userQuery._id,
      };
      const newThoughtQuery = await Thought.create(newThought);

      await User.findOneAndUpdate({
         username: username
      },
      {
         $push: {
            thoughtsIds: newThoughtQuery._id,
         },
      });
      res.status(200).json(newThoughtQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

const getThoughtById = async (req, res) => {
   const thoughtId = req.params.thoughtId;

   try {
      const thoughtQuery = await Thought.findById(thoughtId);
      res.status(200).json(thoughtQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

const updateThoughtById = async (req, res) => {
   try {
      const thoughtId = req.params.thoughtId;
      const updatedThought = req.body;

      const thought = await Thought.findByIdAndUpdate(
         thoughtId,
         updatedThought,
         {
            new: true,
         },
      );
      res.status(200).json(thought);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

const deleteThoughtById = async (req, res) => {
   try {
      const thoughtId = req.params.thoughtId;
      const deleteThoughtQuery = await Thought.findByIdAndDelete(thoughtId);
      
      await User.findByIdAndUpdate(
         deleteThoughtQuery.userId,
         {
            $pull: {
               thoughts: deleteThoughtQuery._id,
            }
         }
      );
      res.status(200).json(deleteThoughtQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

const addReaction = async (req, res) => {
   try {
      const thoughtId = req.params.thoughtId;
      const newReaction = req.body;
      const newReactionQuery = Reaction.create(newReaction);

      const updatedThoughtQuery = await Thought.findByIdAndUpdate(
         thoughtId,
         {
            $addToSet: {
               reactions: newReactionQuery._id,
            },
         },
         {
            new: true,
         },
      );
      res.status(200).json(updatedThoughtQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

// Remove a reaction from reactions array by ID
const deleteReaction = async (req, res) => {
   try {
      const thought = await Thought.findByIdAndUpdate(
         req.params.thoughtId,
         {
            $pull: {
               reactions: { reactionId: req.params.reactionId },
            },
         },
         {
            new: true,
         },
      );
      res.status(200).json(thought);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

module.exports = {
   getAllThoughts,
   createThought,
   getThoughtById,
   updateThoughtById,
   deleteThoughtById,
   addReaction,
   deleteReaction,
};