var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.redirect('vic_homepage.ejs')
})

router.get('/spotInfo',function(req,res){
    res.redirect('vic_spotInfo.ejs')
})

router.get('/map',function(req,res){
    res.redirect('hong_map.ejs')
})

router.get('/login',function(req,res){
    res.redirect('hong_login.ejs')
})

router.get('/trips',function(req,res){
    res.redirect('han_trips.ejs')
})

router.get('/tripInfo',function(req,res){
    res.redirect('han_tripInfo.ejs')
})

router.get('/trophy',function(req,res){
    res.redirect('yen_trophy.ejs')
})

router.get('/profile',function(req,res){
    res.redirect('yen_profile.ejs')
})

router.get('/createTrip',function(req,res){
    res.redirect('lu_createTrip.ejs')
})

router.get('/tripManage',function(req,res){
    res.redirect('song_tripManage.ejs')
})

module.exports = router;