const { User, Thought } = require('../../models');

const getAllThoughts = async (req, res) => {
   try {
      //find all thoughts
      const thoughtsQuery = await Thought.find();

      res.status(200).json(thoughtsQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
}

const createThought = async (req, res) => {
   try {
      //variables
      const thoughtText = req.body.thoughtText;
      const username = req.body.username;

      //new thought body
      const newThought = {
         thoughtText: thoughtText,
         username: username,
      }

      //create new thought
      const newThoughtQuery = await Thought.create(newThought);

      //add new thought to user
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
   try {
      //variable
      const thoughtId = req.params.thoughtId;

      //find thought using thoughtId
      const thoughtQuery = await Thought.findById(thoughtId);

      res.status(200).json(thoughtQuery);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error });
   };
};

const updateThoughtById = async (req, res) => {
   try {
      //variables
      const thoughtId = req.params.thoughtId;
      const updatedThought = req.body;

      //find thought with id, update with new body
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

      //delete thought with thoughtId
      const deleteThoughtQuery = await Thought.findByIdAndDelete(thoughtId);

      //find user and delete thought from list
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
      //variables
      const thoughtId = req.params.thoughtId;
      const newReaction = req.body;

      //find thought with id, update by adding new reaction
      const updatedThoughtQuery = await Thought.findByIdAndUpdate(
         thoughtId,
         {
            $addToSet: {
               reactions: newReaction,
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
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const updatedThoughtQuery = await Thought.findByIdAndUpdate(
         thoughtId,
         {
            $pull: {
               reactions: { reactionId: reactionId },
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

module.exports = {
   getAllThoughts,
   createThought,
   getThoughtById,
   updateThoughtById,
   deleteThoughtById,
   addReaction,
   deleteReaction,
};