var express = require('express');
const task = require('../Models/task');
var router = express.Router();

/* GET users listing. */
router.get('/createTask', function(req, res, next) {
  var newTask=new task();

  newTask.save(function(err,data){
    if(err){
      console.log(err);
      res.render('error');
  }
  else{
    res.redirect('/task/'+data._id);//id will be given by moongoose by the time we enter the data 
  }
});
});


router.get('/task/:id', function(req, res) {
  if (req.params.id) {
    task.findOne({_id: req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        res.render('error');
      }

      if (data) {
        res.render('task', {content: data.content, roomId: data.id});//data represents the task object so by data.content we mean task.content which is in models  
      } else {
        res.render('error');
      }
    });
  } else {
    res.render('error');
  }
});

module.exports = router;
