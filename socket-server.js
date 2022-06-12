'use scrict';

var socketIO=require('socket.io');
var ot=require('ot');
var roomList={};
var task=require('./Models/task');

module.exports=function(server){//normal server which we have in our bin>www file
    var str='This is a MarkDown Heading \n'+
              'var i=i+1';
    var io=socketIO(server);
    io.on('connection',function(socket){//jab connection hoga iss server ke sath toh ye function fire hoga 
        socket.on('Joining',function(data){
            if(!roomList[data.room]){
                var socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function(socket, cb) {
                     var self=this;
                      task.findByIdAndUpdate(data.room,{content:self.document},function(err){
                          if(err) return cb(false);
                          cb(true);
                      });
                    });
                roomList[data.room] = socketIOServer;
            }

            roomList[data.room].addClient(socket);
            roomList[data.room].setName(socket, data.username);
            
            socket.room=data.room;
            socket.join(data.room);
        });
        socket.on('chatMessage',function(data){//one socket will be on named "chatMessage"
            io.to(socket.room).emit('chatMessage',data);//"chatMessage value pair will  be made and isme data hoga jo user send karega"
        });

        socket.on('disconnect',function(){
            socket.leave(socket.room);
        });
    });
};  