let inquirer= require("inquirer");
let fs= require("fs");

let stat= fs.stat;
//持久层文件名
let DAO_FILE= './switch-manager.json';
//待机组件文件夹名前缀
let PREFIX= 'switch-';
let CMD_BACK= '[back to cmd]';
let COPY_POINT= 0;
//持久层对象原型
let Dao= function(){
  this.current= null;
  this.comps= [];
}

//拷贝文件
//exists('./src','./src2',copy);
let copy=function(src,dst){
    //读取目录
    fs.readdir(src,function(err,paths){
        //console.log(paths)
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            var readable;
            var writable;
            stat(_src,function(err,st){
                if(err){
                    throw err;
                }
                
                if(st.isFile()){
                    readable=fs.createReadStream(_src);//创建读取流
                    writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(st.isDirectory()){
                    exists(_src,_dst,copy);
                }
            });
        });
    });
}

let exists=function(src,dst,callback){
    //测试某个路径下文件是否存在
    fs.exists(dst,function(exists){
        if(exists){//不存在
            callback(src,dst);
        }else{//存在
            fs.mkdir(dst,function(){//创建目录
                callback(src,dst)
            })
        }
    })
}

//递归删除文件
let deleteFolderRecursive= function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

let initDaoFile= (res, rej) => {
  let dao= new Dao();
  fs.writeFile(DAO_FILE, JSON.stringify(dao), (error) => {
    if(error){
      rej(error);
    } else {
      res(dao);
    }
  });
};


new Promise((res, rej) =>{
  fs.readFile(DAO_FILE, (err, data) => {
    let dao;
    //如果报错，则建立DAO_FILE文件
    if(err){
      initDaoFile(res, rej);
    }
    //如果未报错，判断data数据格式是否合规，合规返json，不合规返new Dao()
    if(!err){
      dao= JSON.parse(data.toString());
      if(typeof dao=== 'object'){
        res(dao);
      } else {
        res(new Dao());
      }
    }
  });
}).then(data => {
  //持久化对象
  let _dao= data;
  let _currentIndex= _dao.comps.findIndex((ele) => {
    return ele.name=== _dao.current;
  });
  let _nameAgainStatus;
  //组件名单
  let _nameList= _dao.comps.map((ele) => {
    return ele.name;
  });

  let _questions= [
    {
      type: 'list',
      name: 'order',
      //初始化的时候是没有
      message: _currentIndex=== -1? 'current comp is null, select your order':
       'current comp is ['+ _dao.comps[_currentIndex].name+'], select your order',
      choices: ['registe', 'switch', 'delete', 'detail', 'readme'],
    }
  ];

  let _runFunc= () => {
    inquirer.prompt(_questions).then(answers => {
      inputNameFunc(answers);
    });
  };

  let questions2;
  let inputNameFunc= (answers) => {
//如果是注册命令
    if(answers.order=== 'registe'){
      questions2= [
        {
          type: 'input',
          name: 'name',
          message: _nameAgainStatus?"registe name is exists, new one again:": "name the current src as a comp: ",
          validate: function(value) {
            let pass = value.match(
              /^[a-zA-Z0-9]{2,10}$/ 
            );
            if (pass) {
              return true;
            }
            return 'Please enter a valid comp name';
          }
        },
        {
          type: 'input',
          name: 'description',
          message: "describe the comp",
        },
      ];

      inquirer.prompt(questions2).then(answers => {
        let { name, description }= answers;
        let comps= _dao.comps;
        //如果dao.comps存在则查找重名组件，如果不存在则初始化dao.comps为数组
        let findIndex= -1;
        if(comps){
          findIndex= comps.findIndex( ele => {
            return ele.name=== name;
          });
        } else {
          _dao.comps= []; 
        }
        console.log('write');
        //如果组件重名，则从录入开始重新执行
        if(findIndex!== -1){
          _nameAgainStatus= true;
          inputNameFunc({order: 'registe'});
        }
        //  //如果未找到重名组件，则为其备份并重命名
        // exists('./src', './'+ PREFIX+ name, copy);
        // //将current指针指向该组件
        // _dao['current']= name;
        // _dao.comps.push(answers);
        // fs.writeFile(DAO_FILE, JSON.stringify(_dao), (err) => {
        //   console.log(error);
        // });
        
        //如果未找到重名组件，判断当前指针，存在则将当前src目录改名
        if(_dao.current){
          fs.rename('./src', './'+ PREFIX+ _dao.current, (err) => {
            if(err) console.log(err);
            if(!err) {
              //创建新的src
              fs.mkdir('./src', () => {
                if(err) console.log(err);
                if(!err) {
                  _dao['current']= name;
                  _dao.comps.push(answers);
                  fs.writeFile(DAO_FILE, JSON.stringify(_dao), (err) => {
                    console.log(err);
                  });
                }
              });      
            }
          });
        }
        //指针不存在，则只改变指针
        if(!_dao.current){
          _dao['current']= name;
          _dao.comps.push(answers);
          fs.writeFile(DAO_FILE, JSON.stringify(_dao), (err) => {
            console.log(err);
          });
        }
      });
    }

//如果是删除命令
    if(answers.order=== 'delete'){
      //名字列表放入一个默认值，防止报错及退出
      let choices= _nameList.slice(0);
      //去掉当前current指向的组件，不可以删除当前指向的组件
      choices.splice(_currentIndex, 1);
      choices.push(CMD_BACK);
      questions2= [
        {
          type: 'list',
          name: 'name',
          message: 'select comp that to delete',
          choices: choices,
          default: false,
        }
      ];

      let name;
      let index;
      inquirer.prompt(questions2).then(answers => {
        return new Promise((res, rej) => {
          name= answers.name;
          if(name=== CMD_BACK) rej(_runFunc);
          index= _dao.comps.findIndex((ele) => {
            return ele.name=== name;
          });
          comp= _dao.comps[index];
          if(comp)res(comp);
          if(!comp)rej('record is wrong');
        });
      }).then((comp, err) => {
        questions2= [
          {
            type: 'confirm',
            name: 'sureDelete',
            message: `sure delete [${comp.name}:${comp.description}]`,
            default: false
          },
        ];

        inquirer.prompt(questions2).then(answers => {
          if(answers.sureDelete){
            deleteFolderRecursive("./"+ PREFIX+ name);
            if(_dao.comps.splice(index, 1).length=== 1){
              fs.writeFile(DAO_FILE, JSON.stringify(_dao), function(error){
                console.log(error);
              });
            };
          }
        });
      }).catch((err) => {
        if(typeof err=== 'function'){
          err();	
        } else {
          console.log(err);
        };
      });
    }

//如果是更新命令， 更新方法复用给更换方法
    let _updateFunc= () => {
      let comp= _dao.comps[_currentIndex];
      questions2= [
        {
          type: 'confirm',
          name: 'sureUpdate',
          message: `sure update [${comp.name}:${comp.description}]`,
          default: false
        }
      ];

      inquirer.prompt(questions2).then(answers => {
        if(answers.sureUpdate){
          exists('./src', './'+ PREFIX+ comp.name, copy);
        }
      });
    }

    if(answers.order=== 'update'){
      _updateFunc();
    }

//如果是更换命令
    if(answers.order=== 'switch'){
      let choices= _nameList.slice(0);
      //更换命令，去掉当前current指向的组件，防止重复复制
      choices.splice(_currentIndex, 1);
      choices.push(CMD_BACK);
      questions2= [
        {
          type: 'list',
          name: 'name',
          message: 'select comp that to switch',
          choices: choices,
          default: false,
        }
      ];

      let name;
      let index;
      inquirer.prompt(questions2).then(answers => {
        name= answers.name;
        if(name=== CMD_BACK) return new Promise((res, rej) => {rej(_runFunc)});
        index= _dao.comps.findIndex((ele) => {
          return ele.name=== name;
        });
        comp= _dao.comps[index];
        if(comp)return comp;
        if(!comp)throw new Error('can not find the comp you want to switch');
      }).then((comp, err) => {
        if(!comp) return;
        let old= _dao.comps[_currentIndex];
        questions2= [
          {
            type: 'confirm',
            name: 'sureSwitch',
            message: `sure switch [${old.name} ---> ${comp.name}:${comp.description}]`,
            default: false
          },
        ];

        //将当前src重命名为current指向
        return new Promise( (res, rej) => {
          inquirer.prompt(questions2).then( answers => {
            if(!answers.sureSwitch) rej(_runFunc);
            if(answers.sureSwitch){
           	  fs.rename('./src', './'+ PREFIX+ old.name, (err) => {
	            if(err) rej(err);
	            if(!err) res(comp.name);
	          })
            }
          })          
        })
      }).then((name) => {
        return new Promise((res, rej) => {
          fs.rename('./'+ PREFIX+ name, './src', (err) => {
            if(err) rej(err);
            if(!err){
              _dao.current= name;
              fs.writeFile(DAO_FILE, JSON.stringify(_dao), (err) => {
                rej(err);
                res();
              });
            };
          })
        });
      }).catch((err) => {
        if(typeof err=== 'function'){
          err();	
        } else {
          console.log(err);
        };
      });     
    }

    //如果是详情命令
    if(answers.order=== 'detail'){
      let choices= _dao.comps.map((ele, index) => {
        return ele.name+ ':'+ ele.description;
      });
      //置顶当前组件
      let current= choices.splice(_currentIndex, 1);
      choices.unshift(current[0]+ ' [current comp]');
      choices.push(CMD_BACK);
      questions2= [
        {
          type: 'list',
          name: 'name',
          message: 'the detail of comps',
          choices: choices,
          default: false,
        }
      ];

      inquirer.prompt(questions2).then(answers => {
        let name= answers.name;
        if(name=== CMD_BACK) return new Promise((res, rej) => {rej(_runFunc)});
      }).catch( err => {
        if(typeof err=== 'function'){
          err();	
        } else {
          console.log(err);
        };
      });
    }

    //如果是文档命令
    if(answers.order=== 'readme'){
      console.log(
      `
      **当操作中出现权限不足，或文件被占用的情况时，使用unlocker解锁被占用的文件夹**
      registe:注册组件，首个组件注册，只会更改current指针的值。
      switch:更换组件，更改当前src目录为待命目录，将对应的待命目录改名为src
      delete:删除组件，不能删除当前指向组件
      detail:查看所有组件，及其注释
      `
      );
    }
  };

  //调起命令行
  _runFunc();
});