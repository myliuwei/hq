var mongodb=require('mongodb')
var server=new mongodb.Server('127.0.0.1',27017,{auto_reconnect:true})
var db=new mongodb.Db('hunqing',server,{safe:true})
var http=require('http')
var querystring=require('querystring')
var str
http.createServer((req,res)=>{
						res.writeHead(200,{'content-type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'})
								if(req.url!='/favicon.ico'){
								    req.on('data',(data)=>{
								    	str=data.toString();
								    })
								    
								    req.on('end',()=>{
								    	var strs=querystring.parse(str)
								    	console.log(strs.name,strs.pass)
								    var finddata=function(db,callback){
								    	var conn=db.collection('register')
								    	var data={user:strs.name,pass:strs.pass}
								        conn.find(data).toArray(function(err,result){
								        	callback(result)
								        })
								    }
								    
								    db.open(function(err,db){
								    	if(err){
								    		console.log('链接失败')
								    	}else{
								    		finddata(db,function(result){
								    			if(result.length>0){
								    				console.log('登录成功')
								    			}else{
								    				console.log('登录失败')
								    			}
								    		})
								    	}
								    })
								    
								    })
								    
									res.end()
								}
							}).listen(3020)



