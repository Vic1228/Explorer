var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('vic_homepage.ejs')
})

router.get('/spotInfo',function(req,res){
    res.render('vic_spotInfo.ejs')
})

router.get('/map',function(req,res){
    res.render('hong_map.ejs')
})

router.get('/login',function(req,res){
    res.render('hong_login.ejs')
})

router.get('/trips',function(req,res){
    res.render('han_trips.ejs')
})

router.get('/tripInfo',function(req,res){
    res.render('han_tripInfo.ejs')
})

router.get('/trophy',function(req,res){
    res.render('yen_trophy.ejs')
})

router.get('/profile',function(req,res){
    res.render('yen_profile.ejs')
})

router.get('/createTrip',function(req,res){
    res.render('lu_createTrip.ejs')
})

router.get('/tripManage',function(req,res){
    res.render('song_tripManage.ejs')
})

module.exports = router;