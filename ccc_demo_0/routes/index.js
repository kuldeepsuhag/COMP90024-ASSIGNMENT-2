var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('index.html');
});

router.get('/Warth', function(req, res) {
  res.redirect('Warth.html');
});

router.get('/Gluttony', function(req, res) {
  res.redirect('Gluttony.html');
});

router.get('/Lust', function(req, res) {
  res.redirect('Lust.html');
});

router.get('/Envy', function(req, res) {
  res.redirect('Envy.html');
});

router.get('/Sloth', function(req, res) {
  res.redirect('Sloth.html');
});

router.get('/WrathMap', function(req, res){
  res.redirect('WrathMap.html');
});

router.get('/crime_in_Sydeny', function (req, res){
  res.redirect('crimInSydney.html');
});

module.exports = router;