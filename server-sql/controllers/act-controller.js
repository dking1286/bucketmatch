const database = require('../models/database');
const UserActivity = require('./ua-controller.js');

const sequelize = database.sequelize;
const Activity = database.Activity;

function index(req, res) { // retruns a list of all activities
  Activity.findAll({}).then((acts) => {
    return res.json(acts);
  });
}

function add(req, res, next) { // adds a new activity to the database
  console.log('---->', req.body);
  const {userId, activityName, activityDescription} = req.body;

  Activity.create({
    actname: activityName,
    actdesc: activityDescription
  })
    .then((resp) => {
      console.log(resp, '+++++ ' + resp.dataValues._id, resp.dataValues.userId);
      req.body.activityId = resp.dataValues._id;
      next();
    })
    .catch((err) => {
      if (err) console.error(err);
    });    
}

function show(req, res, next) { // finds a single activity
  Activity.find(req.body[0], err => {
    if (err) console.error(err);
  });
  next();
}

module.exports = { index, add, show };
