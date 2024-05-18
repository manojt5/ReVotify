// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   options: [
//     {
//       option: { type: String, required: true },
//       responses: { type: Number, default: 0 }, // Default to 0 responses
//     }
//   ],
// });

// const pollSchema = new mongoose.Schema({
//   userid: { type: String, required: true },
//   type:{type:String,required:true},
//   title: { type: String, required: true },
//   starttime: { type: String, required: true },
//   endtime: { type: String, required: true },
//   // Define voterslist as an array of strings
//   voterslist: { type: [String], required: true },
//   questions: { type: [questionSchema], required: true },
//   participated: {type: [String], default:[]},
//   timeup: {type: Boolean, required:true,default:false}
// });

// const optionSchema = new mongoose.Schema({
//   name: String,
//   img_url: String,
// });

// const QuestionSchema = new mongoose.Schema({
//   question: String,
//   options: [optionSchema],
// });

// const voteSchema = new mongoose.Schema({
//   userid: {
//     type: String,
//     required: true,
//   },
//   title: String,
//   type: {
//     type: String,
//     default: 'Vote',
//   },
//   starttime: String,
//   endtime: String,
//   voterslist: [String],
//   questions: [QuestionSchema],
// });


// const userSchema=new mongoose.Schema({
//   is_logged_in:{type:Boolean,required:true,default:false},
//   name:{type:String,required:true},
//   email:{type:String,required:true},
//   password:{type:String,required:true},
//   poll_participate:{type:[mongoose.Schema.Types.ObjectId],default:[]},
//   vote_participate:{type:[String],default:[]},
// });

// const UserModel=mongoose.model('user',userSchema)
// const PollModel = mongoose.model('Poll', pollSchema);
// const Vote = mongoose.model('Vote', voteSchema);

// module.exports = {PollModel,UserModel,Vote};
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      option: { type: String, required: true },
      responses: { type: Number, default: 0 }, // Default to 0 responses
    }
  ],
});

const pollSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  type:{type:String,required:true},
  title: { type: String, required: true },
  starttime: { type: String, required: true },
  endtime: { type: String, required: true },
  // Define voterslist as an array of strings
  voterslist: { type: [String], required: true },
  questions: { type: [questionSchema], required: true },
  participated: {type: [String], default:[]},
  timeup: {type: Boolean, required:true,default:false}
});




const VoteoptionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  img: { type: String, required: true },
  responses: { type: Number, default: 0 },
});

const VotequestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [VoteoptionSchema],
});

const voteSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, default: 'Vote' },
  starttime: { type: Date },
  endtime: { type: Date },
  participated: {type: [String], default:[]},
  voterslist: { type: Array, default: [] },
  questions: VotequestionSchema,
});


const userSchema=new mongoose.Schema({
  is_logged_in:{type:Boolean,required:true,default:false},
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  poll_participate:{type:[mongoose.Schema.Types.ObjectId],default:[]},
  vote_participate:{type:[String],default:[]},
});

const UserModel=mongoose.model('user',userSchema)
const PollModel = mongoose.model('Poll', pollSchema);
const VoteModel = mongoose.model('Vote', voteSchema);

module.exports = {PollModel,UserModel,VoteModel};