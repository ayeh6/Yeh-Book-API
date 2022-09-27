# Yeh Book API

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

The challenge of this assignment is to create a backend API for a social network using Mongodb to store data and Mongoose to interact with that data.

### User Story

AS A social media startup  
I WANT an API for my social network that uses a NoSQL database  
SO THAT my website can handle large amounts of unstructured data

### Acceptance Criteria

GIVEN a social network API  
WHEN I enter the command to invoke the application  
THEN my server is started and the Mongoose models are synced to the MongoDB database  
WHEN I open API GET routes in Insomnia for users and thoughts  
THEN the data for each of these routes is displayed in a formatted JSON  
WHEN I test API POST, PUT, and DELETE routes in Insomnia  
THEN I am able to successfully create, update, and delete users and thoughts in my database  
WHEN I test API POST and DELETE routes in Insomnia  
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

### Links

- Repository URL: [https://github.com/ayeh6/Yeh-Book-API](https://github.com/ayeh6/Yeh-Book-API)

## My process

### Built with

- Node
- Express
- Mongodb
- Mongoose

### What I learned

One thing I learned that is pretty neat is how similar mongoose is to sequelize, but less complicated with parameters. Though it is missing the benefits of CASCADE from mySQL, such that if I were to update a user, the username wouldn't update on the thoughts because thoughts and reactions only holds then username. Because of this, these lines of code are necessary.

```js
//update username in all thoughts and reactions
if (updatedUserBody.username) {
   const allThoughts = await Thought.find();
   //for every thought
   for(let i=0; i<allThoughts.length; i++) {
      if(allThoughts[i].username === oldUserQuery.username) {
         allThoughts[i].username = updatedUserBody.username;
      }
      //for every reaction in this thought
      for(let j=0; j<allThoughts.reactions.length; j++) {
         if(allThoughts.reactions[j].username === oldUserQuery.username) {
            allThoughts.reactions[j].username = updatedUserBody.username;
         }
      }
   }
}
```
Basically I am brute forcing each thought and reaction, checking for the old username and then having to update it. Not optimal, rather just hold ids instead to reference the user.

### Continued development

As for continued development, probably optimize the schema such that I wouldn't have to brute force every object when something is updated.

### Useful resources

- [Mongoose Documentation](https://mongoosejs.com/docs/index.html) - This source helped me understand the functions, types and parameters.

## Author

- Website - [Andrew Yeh](https://ayeh6.github.io/Yeh-Andrew-Portfolio-Website/)
- LinkedIn - [/in/ayeh6](https://www.linkedin.com/in/ayeh6/)
