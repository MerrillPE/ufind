import React, { useState, useEffect, } from "react";
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, } from "@mui/material";
//import {auth} from '../forum/middleware/auth.js';
import { getMyPosts } from '../../actions/forum';
import Posts from '../Posts/Posts';

const MyPosts = (req) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //const auth = require("../middleware/auth");

    console.log("Before use effect")

    useEffect(() => {
        // dispatch get request at page load
        dispatch(getMyPosts()); //this query should call the right api

        // Checking data flow
        //posts.data.map((post) => console.log(post))
    }, [dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                       
                    </Grid>
                </Grid>
            </Container>
        </Grow>


        //<Typography>TEST HOME</Typography>
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
*/