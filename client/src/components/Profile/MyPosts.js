import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grow, Grid, CircularProgress, Box} from "@mui/material";
//import {auth} from '../forum/middleware/auth.js';
import { getMyPosts } from '../../actions/forum';
import Posts from '../Posts/Posts';
import PostCard from '../Posts/PostCard';

const MyPosts = (req) => {
    const dispatch = useDispatch();
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const user = JSON.parse(localStorage.getItem('profile'));
    // use user name for post search 
    const { posts, isLoading } = useSelector((state) => state.forumReducer);

    
    console.log("JUser: " + user?.username);
    //const auth = require("../middleware/auth");

    console.log("Before use effect")

    useEffect(() => {
        // dispatch get request at page load
        dispatch(getMyPosts( user?.username )); //this query should call the right api, req.UserID

        // Checking data flow
        //posts.data.map((post) => console.log(post))
    }, [dispatch]);

    return (
      /*
        <Grow in>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                       
                    </Grid>
                </Grid>
            </Container>
        </Grow>


        //<Typography>TEST HOME</Typography>
        */
        
        isLoading ? (
          <Box style={{
              display: 'flex', flexDirection: 'column',
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
          }}>
              <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} alignItems='stretch'>
            <Grid key='1024' item>
            </Grid>
              {posts.map((post) => (
                  <Grid key={post._id} item >
                      <PostCard post={post} />
                  </Grid>
              ))}
          </Grid>
      )
    );
}

export default MyPosts;

/*
import User from '../models/user.js';
import authRouter from './routes/auth.js'
import forumRouter from './routes/forum.js'

const ObjectId = require("mongoose").Types.ObjectId;

authRouter.get("/user-posts", async (req, res) => {
  try {
    const userId = req.user.id; //change this to logged -in user id
    const result = await User.aggregate([
      {
        $match: {
          _id: ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: "posts",        //must be collection name for posts
          localField: "_id",
          foreignField: "userId",
          as: "posts"
        }
      }
    ]);

    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong, check logs");
  }
});




App.get("/author", function(req, res){
  Post.find({ "User.username": req.user.username }, function(err, author){
  if (err){
  console.log("ERROR!");
   } else { 
res.render("done.ejs", {Post: author, currentUser: req.user});
}
});
});
*/