var express=require("express");
var app=express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);
//首先定义一个路由
var router=express.Router();

//使用中间件
router.use(function firstFunc(req, res, next){
    console.log("Time: ",Date.now());
    next();
});

router.post("/mobile/player/doregister",function(req,res){
    setTimeout(() => {
      res.send({name: 2});
    }, 10000);
});

router.post("/mobile/player/dopassword",function(req,res){
    res.send({name: 2});
});

//如果是根目录下的about目录
router.post("/mobile/player/sms",function(req,res){
    res.send({"status":"0000","msg":"\u53d1\u9001\u6210\u529f","data":{"code":3683}});
});

//使用路由
//可输入http://127.0.0.1:8000/myRoot得到home page
//可输入http://127.0.0.1:8000/myRoot/about得到about page
//在得到返回的page之前，会先执行firstFunc函数
app.use("/", router);

//开启站点
app.listen(2234, function(){
	console.log(2234);
});