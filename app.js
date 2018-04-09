var express = require('express')

var bodyParser = require('body-parser')

var MySql = require('mysql')

var app = express()

app.use(bodyParser.urlencoded({}))

var pool = MySql.createPool({
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'itemtwo',
        port:3306
    })

app.post('/',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection((err,connection) => {
        if(err){
            console.log(err)
            return
        }
        var sql = `select * from mobanmingdan where state=${req.body.state}`
        connection.query(sql,(err,data) => {
            if(err){
                console.log(err)
                return
            }
            res.send(data)
            connection.end()
            
    })
    })
    
})

app.post('/del',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection(function(err,connection){
        if(err){
            console.log(err)
            return
        }
        var sql = `delete from mobanmingdan where id=${req.body.id}`
        connection.query(sql,function(err,data){
            if(err){
                console.log(err)
                return
         }
            res.send(data)
            connection.end()
        })
    })
})

app.post('/add',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    var json = req.body
    pool.getConnection(function(err,connection){
        if(err){
            console.log(err)
            return
        }
        var sql = `insert into mobanmingdan (name,gender,state) value (?,?,?)`
        connection.query(sql,[json.name,json.gender,json.state],function(err,data){
            if(err){
                console.log(err)
                return
         }
            res.send(data)
            connection.end()
        })
    })
})

app.listen(3000,function(){
    console.log('吃饭睡觉打豆豆')
})