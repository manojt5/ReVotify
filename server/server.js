// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const uploadImage = require("./uploadImage.js");
// const { PollModel, UserModel ,VoteModel} = require('./schema');
// const cors=require("cors");

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(cors());

// app.use(express.urlencoded({ limit: "25mb" }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.post("/uploadImage", (req, res) => {
//   uploadImage(req.body.image)
//     .then((url) => res.send(url))
//     .catch((err) => res.status(500).send(err));
// });

// app.post("/uploadMultipleImages", (req, res) => {
//   uploadImage
//     .uploadMultipleImages(req.body.images)
//     .then((urls) => res.send(urls))
//     .catch((err) => res.status(500).send(err));
// });

// mongoose.connect('mongodb+srv://trailing:trailing@trialing.rde83gv.mongodb.net/Votify');

// // Create a new poll
// // app.post('/polls', async (req, res) => {
// //   try {
// //     const newPoll = await PollModel.create(req.body);
// //     res.status(201).json(newPoll);
// //   } catch (error) {
// //     console.error('Error creating poll:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// app.post('/polls', async (req, res) => {
//   try {
//     const newPoll = await PollModel.create(req.body);
//     console.log("in server side");
//     console.log(req.body.voterslist);
//     console.log(newPoll);
//     await Promise.all(
//       req.body.voterslist.map(async (email) => {
//         try {
//           const updateUser = await UserModel.findOne({ email: email });

//           if (!updateUser) {
//             console.log(`User with email ${email} not found, creating a new user`);
//             const newUser = await UserModel.create({
//               name: 'name',
//               email: email, // Use the email from the voterslist
//               password: 'password',
//               poll_participate: [newPoll._id]
//             });

//             console.log('New user created:', newUser);
//           } else {
//             const updatedUser = await UserModel.findByIdAndUpdate(
//               updateUser._id,
//               { $push: { poll_participate: [newPoll._id] } },
//               { new: true }
//             );
//             console.log(updatedUser);

//             console.log(`User with email ${email} updated successfully`);
//           }
//         } catch (error) {
//           console.error(`Error updating/creating user with email ${email}:, error`);
//         }
//       })
//     );

//     res.status(201).json(newPoll);
//   } catch (error) {
//     console.error('Error creating poll:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/vote', async (req, res) => {
//   try {
//     const newVote = await VoteModel.create(req.body);
//     const user = await UserModel.findOne({ is_logged_in: true });
//     newVote.userid = user.email
//     const new_updatedVote = await newVote.save();
//     console.log("in server side");
//     console.log(req.body.voterslist);
//     console.log(new_updatedVote);
//     await Promise.all(
//       req.body.voterslist.map(async (email) => {
//         try {
//           const updateUser = await UserModel.findOne({ email: email });

//           if (!updateUser) {
//             console.log(`User with email ${email} not found, creating a new user`);
//             const newUser = await UserModel.create({
//               name: 'name',
//               email: email, // Use the email from the voterslist
//               password: 'password',
//               vote_participate: [newVote._id]
//             });

//             console.log('New user created:', newUser);
//           } else {
//             const updatedUser = await UserModel.findByIdAndUpdate(
//               updateUser._id,
//               { $push: { vote_participate: [newVote._id] } },
//               { new: true }
//             );
//             console.log(updatedUser);

//             console.log(`User with email ${email} updated successfully`);
//           }
//         } catch (error) {
//           console.error(`Error updating/creating user with email ${email}:, error`);
//         }
//       })
//     );

//     res.status(201).json(newVote);
//   } catch (error) {
//     console.error('Error creating poll:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Get all polls
// app.get('/polls', async (req, res) => {
//   try {
//     const polls = await PollModel.find();
//     res.json(polls);
//   } catch (error) {
//     console.error('Error fetching polls:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// app.get('/vote', async (req, res) => {
//   try {
//     const votes = await VoteModel.find();
//     res.json(votes);
//   } catch (error) {
//     console.error('Error fetching polls:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// app.get('/partpolls', async (req, res) => {
//   try {
//     // Find the user whose is_logged_in is true
//     const user = await UserModel.findOne({ is_logged_in: true });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Fetch only the relevant polls based on poll_participate
//     const polls = await PollModel.find({ _id: { $in: user.poll_participate } });
//     ls = [polls,user.email]
//     console.log(ls)

//     res.send(ls);
//   } catch (error) {
//     console.error('Error fetching polls:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// app.get('/partvote', async (req, res) => {
//   try {
//     // Find the user whose is_logged_in is true
//     const user = await UserModel.findOne({ is_logged_in: true });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Fetch only the relevant polls based on poll_participate
//     const vote = await VoteModel.find({ _id: { $in: user.vote_participate } });
//     ls = [vote,user.email]
//     console.log(ls)

//     res.send(ls);
//   } catch (error) {
//     console.error('Error fetching polls:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/history', async (req, res) => {
//   try {
//     // Find the user whose is_logged_in is true
//     const user = await UserModel.findOne({ is_logged_in: true });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     ls = []

//     // Fetch only the relevant polls based on poll_participate
//     const polls = await PollModel.find({ userid: user.email });
//     ls.push(polls)
//     const vote_forms = await VoteModel.find({ userid: user.email});
//     ls.push(vote_forms)
//     console.log(ls)

//     res.send(ls);
//   } catch (error) {
//     console.error('Error fetching polls:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       console.log("nouser");
//       return res.status(404).json({ message: "User not found. Create an account." });
//     }
//     if (!(await bcrypt.compare(req.body.password, user.password))) {
//       return res.status(401).json({ message: "Incorrect password." });
//     }

//     // Set is_logged_in to false for all users except the logged-in user
//     await UserModel.updateMany({ _id: { $ne: user._id } }, { $set: { is_logged_in: false } });

//     // Set is_logged_in to true for the logged-in user
//     await UserModel.updateOne({ _id: user._id }, { $set: { is_logged_in: true } });

//     res.status(200).json({ message: "Login successful." });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });




// app.post('/password_change', async (req, res) => {
//   try {
//     // Check if the email already exists in the database
//     const existingUser = await UserModel.findOne({ email: req.body.email });

//     if (existingUser) {
//       // If the email exists
//       if (await bcrypt.compare(req.body.prev_password, existingUser.password)) {
//         const hashedPassword = await bcrypt.hash(req.body.new_password, saltRounds);
//         existingUser.password = hashedPassword;
//         console.log(req.body.new_password)

//         // Save the updated user to the database
//         const updatedUser = await existingUser.save();
//         console.log(updatedUser)
//         res.status(200).json(updatedUser);
//       } else {
//         return res.status(401).json({ message: "Incorrect old password." });
//       }
//     } else {
//       return res.status(404).json({ message: "User not found. Create an account." });
//     }
//   } catch (error) {
//     console.error('Error creating/updating user:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });



// app.post("/logout", async (req, res) => {
//   try {
//     await UserModel.updateMany({}, { $set: { is_logged_in: false } });
//     res.status(200).json({ message: "Logout successful." });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/getuser", async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ is_logged_in: true });

//     if (!user) {
//       return res.status(404).json({ message: "No user found." });
//     }

//     res.status(200).json({ user });
//   } catch (error) {
//     console.error("Get user error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.put('/vote/:id', async (req, res) => {
//   try {
//     const updatedVote = await VoteModel.findByIdAndUpdate(req.params.id, req.body.Data, { new: true });

//     if (!updatedVote) {
//       return res.status(404).send('Poll not found');
//     }
//     const user = await UserModel.findOne({ is_logged_in: true });
//     updatedVote.participated.push(user.email);
//     const new_updatedVote = await updatedVote.save();
//     console.log(new_updatedVote);
//     res.json(new_updatedVote);
//   } catch (error) {
//     console.error('Error updating poll by ID:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/polls/:id', async (req, res) => {
//   try {
//     const poll = await PollModel.findById(req.params.id);
//     if (!poll) {
//       return res.status(404).send('Poll not found');
//     }
//     res.json(poll);
//   } catch (error) {
//     console.error('Error fetching poll by ID:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// app.get('/vote/:id', async (req, res) => {
//   try {
//     const vote = await VoteModel.findById(req.params.id);
//     if (!vote) {
//       return res.status(404).send('Vote not found');
//     }
//     res.json(vote);
//   } catch (error) {
//     console.error('Error fetching vote by ID:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Update a poll by ID
// app.put('/polls/:id', async (req, res) => {
//   try {
//     const updatedPoll = await PollModel.findByIdAndUpdate(req.params.id, req.body.Data, { new: true });

//     if (!updatedPoll) {
//       return res.status(404).send('Poll not found');
//     }
//     const user = await UserModel.findOne({ is_logged_in: true });
//     updatedPoll.participated.push(user.email);
//     const new_updatedPoll = await updatedPoll.save();
//     console.log(new_updatedPoll);
//     res.json(new_updatedPoll);
//   } catch (error) {
//     console.error('Error updating poll by ID:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// app.delete('/polls/:id', async (req, res) => {
//   try {
//     // Find and delete the poll
//     const deletedPoll = await PollModel.findByIdAndDelete(req.params.id);

//     // If the poll was not found
//     if (!deletedPoll) {
//       return res.send('Poll not found');
//     }

//     // Remove the deleted poll's ID from users' poll_participate array
//     await UserModel.updateMany(
//       { poll_participate: req.params.id },
//       { $pull: { poll_participate: req.params.id } }
//     );

//     // Remove the deleted poll's ID from users' vote_participate array
//     await UserModel.updateMany(
//       { vote_participate: req.params.id },
//       { $pull: { vote_participate: req.params.id } }
//     );

//     // Send the deleted poll data in the response
//     res.json(deletedPoll);
//   } catch (error) {
//     console.error('Error deleting poll by ID:', error);
//     res.status(500).send('Internal Server Error');
// }
// });

// const saltRounds = 10; // Number of salt rounds for bcrypt

// app.post('/signup', async (req, res) => {
//   try {
//     // Check if the email already exists in the database
//     const existingUser = await UserModel.findOne({ email: req.body.email });

//     if (existingUser) {
//       // If the email exists
//       if ('password' == existingUser.password) {
//         // If the existing user's password is 'password', update it
//         const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//         existingUser.password = hashedPassword;
//         existingUser.name = req.body.name;

//         // Save the updated user to the database
//         const updatedUser = await existingUser.save();

//         res.status(201).json(updatedUser);
//       } else {
//         // If the existing user's password is not 'password', send a response indicating that the account already exists
//         res.status(409).json({ message: 'Account with this email already exists' });
//       }
//     } else {
//       // If the email doesn't exist, create a new user
//       const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//       const newUser = await UserModel.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword,
//       });

//       res.status(201).json(newUser);
//     }
//   } catch (error) {
//     console.error('Error creating/updating user:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const uploadImage = require("./uploadImage.js");
const { PollModel, UserModel ,Vote, VoteModel} = require('./schema');
const cors=require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.post("/uploadMultipleImages", (req, res) => {
  uploadImage
    .uploadMultipleImages(req.body.images)
    .then((urls) => res.send(urls))
    .catch((err) => res.status(500).send(err));
});

mongoose.connect('mongodb+srv://trailing:trailing@trialing.rde83gv.mongodb.net/Votify');

// Create a new poll
// app.post('/polls', async (req, res) => {
//   try {
//     const newPoll = await PollModel.create(req.body);
//     res.status(201).json(newPoll);
//   } catch (error) {
//     console.error('Error creating poll:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.post('/polls', async (req, res) => {
  try {
    const newPoll = await PollModel.create(req.body);
    const user = await UserModel.findOne({ is_logged_in: true });
    newPoll.userid = user.email
    const new_updatedPoll = await newPoll.save();
    console.log("in server side");
    console.log(req.body.voterslist);
    console.log(new_updatedPoll);
    await Promise.all(
      req.body.voterslist.map(async (email) => {
        try {
          const updateUser = await UserModel.findOne({ email: email });

          if (!updateUser) {
            console.log(`User with email ${email} not found, creating a new user`);
            const newUser = await UserModel.create({
              name: 'name',
              email: email, // Use the email from the voterslist
              password: 'password',
              poll_participate: [newPoll._id]
            });

            console.log('New user created:', newUser);
          } else {
            const updatedUser = await UserModel.findByIdAndUpdate(
              updateUser._id,
              { $push: { poll_participate: [newPoll._id] } },
              { new: true }
            );
            console.log(updatedUser);

            console.log(`User with email ${email} updated successfully`);
          }
        } catch (error) {
          console.error(`Error updating/creating user with email ${email}:, error`);
        }
      })
    );

    res.status(201).json(newPoll);
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/vote', async (req, res) => {
  try {
    const newVote = await VoteModel.create(req.body);
    const user = await UserModel.findOne({ is_logged_in: true });
    newVote.userid = user.email
    const new_updatedVote = await newVote.save();
    console.log("in server side");
    console.log(req.body.voterslist);
    console.log(new_updatedVote);
    await Promise.all(
      req.body.voterslist.map(async (email) => {
        try {
          const updateUser = await UserModel.findOne({ email: email });

          if (!updateUser) {
            console.log(`User with email ${email} not found, creating a new user`);
            const newUser = await UserModel.create({
              name: 'name',
              email: email, // Use the email from the voterslist
              password: 'password',
              vote_participate: [newVote._id]
            });

            console.log('New user created:', newUser);
          } else {
            const updatedUser = await UserModel.findByIdAndUpdate(
              updateUser._id,
              { $push: { vote_participate: [newVote._id] } },
              { new: true }
            );
            console.log(updatedUser);

            console.log(`User with email ${email} updated successfully`);
          }
        } catch (error) {
          console.error(`Error updating/creating user with email ${email}:, error`);
        }
      })
    );

    res.status(201).json(newVote);
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).send('Internal Server Error');
  }
});





// Get all polls
app.get('/polls', async (req, res) => {
  try {
    const polls = await PollModel.find();
    res.json(polls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/partpolls', async (req, res) => {
  try {
    // Find the user whose is_logged_in is true
    const user = await UserModel.findOne({ is_logged_in: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch only the relevant polls based on poll_participate
    const polls = await PollModel.find({ _id: { $in: user.poll_participate } });
    ls = [polls,user.email]
    console.log(ls)

    res.send(ls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/partvote', async (req, res) => {
  try {
    // Find the user whose is_logged_in is true
    const user = await UserModel.findOne({ is_logged_in: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch only the relevant polls based on poll_participate
    const vote = await VoteModel.find({ _id: { $in: user.vote_participate } });
    ls = [vote,user.email]
    console.log(ls)

    res.send(ls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Find the user by email
//       const user = await UserModel.findOne({ email });
  
//       if (!user) {
//         // User not found, prompt to create a new account
//         console.log("nouser")
//         return res.status(404).json({ message: "User not found. Create an account." });
//       }
  
//       // Check the password
//       if (user.password !== password) {
//         // Wrong password
//         return res.status(401).json({ message: "Incorrect password." });
//       }
  
//       // Login successful
//       res.status(200).json({ message: "Login successful." });
//     } catch (error) {
//       console.error("Login error:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });
// Get a specific poll by ID

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       console.log("nouser");
//       return res.status(404).json({ message: "User not found. Create an account." });
//     }
//     if (user.password !== password) {
//       return res.status(401).json({ message: "Incorrect password." });
//     }
//     await UserModel.updateMany({ _id: { $ne: user._id } }, { $set: { is_logged_in: false } });
//     res.status(200).json({ message: "Login successful." });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("nouser");
      return res.status(404).json({ message: "User not found. Create an account." });
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Set is_logged_in to false for all users except the logged-in user
    await UserModel.updateMany({ _id: { $ne: user._id } }, { $set: { is_logged_in: false } });

    // Set is_logged_in to true for the logged-in user
    await UserModel.updateOne({ _id: user._id }, { $set: { is_logged_in: true } });

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
});



app.get('/history', async (req, res) => {
  try {
    // Find the user whose is_logged_in is true
    const user = await UserModel.findOne({ is_logged_in: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    ls = []

    // Fetch only the relevant polls based on poll_participate
    const polls = await PollModel.find({ userid: user.email });
    ls.push(polls)
    const vote_forms = await VoteModel.find({ userid: user.email});
    ls.push(vote_forms)
    console.log(ls)

    res.send(ls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).send('Internal Server Error');
  }
});






app.post('/password_change', async (req, res) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      // If the email exists
      if (await bcrypt.compare(req.body.prev_password, existingUser.password)) {
        const hashedPassword = await bcrypt.hash(req.body.new_password, saltRounds);
        existingUser.password = hashedPassword;
        console.log(req.body.new_password)

        // Save the updated user to the database
        const updatedUser = await existingUser.save();
        console.log(updatedUser)
        res.status(200).json(updatedUser);
      } else {
        return res.status(401).json({ message: "Incorrect old password." });
      }
    } else {
      return res.status(404).json({ message: "User not found. Create an account." });
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.post("/logout", async (req, res) => {
  try {
    await UserModel.updateMany({}, { $set: { is_logged_in: false } });
    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getuser", async (req, res) => {
  try {
    const user = await UserModel.findOne({ is_logged_in: true });

    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put('/vote/:id', async (req, res) => {
  try {
    const updatedVote = await VoteModel.findByIdAndUpdate(req.params.id, req.body.Data, { new: true });

    if (!updatedVote) {
      return res.status(404).send('Poll not found');
    }
    const user = await UserModel.findOne({ is_logged_in: true });
    updatedVote.participated.push(user.email);
    const new_updatedVote = await updatedVote.save();
    console.log(new_updatedVote);
    res.json(new_updatedVote);
  } catch (error) {
    console.error('Error updating poll by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/polls/:id', async (req, res) => {
  try {
    const poll = await PollModel.findById(req.params.id);
    if (!poll) {
      return res.status(404).send('Poll not found');
    }
    res.json(poll);
  } catch (error) {
    console.error('Error fetching poll by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/vote/:id', async (req, res) => {
  try {
    const vote = await VoteModel.findById(req.params.id);
    if (!vote) {
      return res.status(404).send('Vote not found');
    }
    res.json(vote);
  } catch (error) {
    console.error('Error fetching poll by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a poll by ID
app.put('/polls/:id', async (req, res) => {
  try {
    const updatedPoll = await PollModel.findByIdAndUpdate(req.params.id, req.body.Data, { new: true });

    if (!updatedPoll) {
      return res.status(404).send('Poll not found');
    }
    const user = await UserModel.findOne({ is_logged_in: true });
    updatedPoll.participated.push(user.email);
    const new_updatedPoll = await updatedPoll.save();
    console.log(new_updatedPoll);
    res.json(new_updatedPoll);
  } catch (error) {
    console.error('Error updating poll by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a poll by ID
// app.delete('/polls/:id', async (req, res) => {
//   try {
//     const deletedPoll = await PollModel.findByIdAndDelete(req.params.id);
//     if (!deletedPoll) {
//       return res.send('Poll not found');
//     }
//     res.json(deletedPoll);
//   } catch (error) {
//     console.error('Error deleting poll by ID:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
app.delete('/polls/:id', async (req, res) => {
  try {
    // Find and delete the poll
    const deletedPoll = await PollModel.findByIdAndDelete(req.params.id);

    // If the poll was not found
    if (!deletedPoll) {
      return res.send('Poll not found');
    }

    // Remove the deleted poll's ID from users' poll_participate array
    await UserModel.updateMany(
      { poll_participate: req.params.id },
      { $pull: { poll_participate: req.params.id } }
    );

    // Remove the deleted poll's ID from users' vote_participate array
    await UserModel.updateMany(
      { vote_participate: req.params.id },
      { $pull: { vote_participate: req.params.id } }
    );

    // Send the deleted poll data in the response
    res.json(deletedPoll);
  } catch (error) {
    console.error('Error deleting poll by ID:', error);
    res.status(500).send('Internal Server Error');
}
});
// app.post('/signup', async (req, res) => {
//     try {
//       const newUser = await UserModel.create({name:req.body.name,email:req.body.email,password:req.body.password});
//       res.status(201).json(newUser);
//     } catch (error) {
//       console.error('Error creating poll:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
// app.post('/signup', async (req, res) => {
//     try {
//       // Check if the email already exists in the database
//       const existingUser = await UserModel.findOne({ email: req.body.email });
  
//       if (existingUser) {
//           if( existingUser.password == 'password')
//           {
//             existingUser.password = req.body.password;
//             existingUser.name = req.body.name;
//             console.log(existingUser)
//             const updatedUser = await existingUser.save();
//             console.log(updatedUser)
//             res.status(201).json(updatedUser)
//           }
//           else{
//           // If the email exists, send a response indicating that the account already exists
//           res.status(409).json({ message: 'Account with this email already exists' });
//         }
//       } else {
//         // If the email doesn't exist, create a new user
//         const newUser = await UserModel.create({
//           name: req.body.name,
//           email: req.body.email,
//           password: req.body.password,
//         });
//         res.status(201).json(newUser);
//       }
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



const saltRounds = 10; // Number of salt rounds for bcrypt

app.post('/signup', async (req, res) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      // If the email exists
      if ('password' == existingUser.password) {
        // If the existing user's password is 'password', update it
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        existingUser.password = hashedPassword;
        existingUser.name = req.body.name;

        // Save the updated user to the database
        const updatedUser = await existingUser.save();

        res.status(201).json(updatedUser);
      } else {
        // If the existing user's password is not 'password', send a response indicating that the account already exists
        res.status(409).json({ message: 'Account with this email already exists' });
      }
    } else {
      // If the email doesn't exist, create a new user
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const newUser = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
