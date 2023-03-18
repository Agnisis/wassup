const express =require('express');
const app=express();
const http=require('http').createServer(app);
const PORT=process.env.PORT || 3000;



app.use(express.static('public'));

http.listen(PORT,()=>{
    console.log('====================================');
    console.log(`listining on port ${PORT}`);
    console.log('====================================');
})



app.get('/',(req,res)=>{
      

    res.sendFile(__dirname+'/index.html');
})

//socket

const io=require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log('====================================');
    console.log('connected...');
    console.log('====================================');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})