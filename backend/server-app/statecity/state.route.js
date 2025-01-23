const express=require('express');
const stateRoute=express.Router();
var State=require('./state.model');

//save state in DataBase(MongoDB)
stateRoute.route('/save').post((req,res)=>{
    let state=new State(req.body);
    state.save().then(state=>{
        res.send("state saved");
        res.end();
    })
    .catch(err=>{
        res.send("Unable to save to database");
    })
})

//show all states
stateRoute.route('/show').get((req,res)=>{
    State.find().then((state)=>{
        res.send(state);
        res.end();

    }).catch((err)=>{
        res.send(err);
        res.end();
    })

})
module.exports=stateRoute;