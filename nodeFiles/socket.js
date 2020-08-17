const socket = require('socket.io')
const { isRealString } = require('./util/isRealString')
const data = require('./modals/data')
// const {User}=require('./util/user')
let { generateMessage}= require('./util/message') //Giving structure to our sent Message 


var SocketRun = server => {
    let io = socket(server)
    io.on('connection', socket => { //Creating Connection
        console.log("Soctet connection")

        socket.on('disconnect', () => {  //Execute when user disconnect
            console.log("user just disconnected", socket.id)
            // var user = users.removeUser(socket.id)

            data.findOne({ id: socket.id }, (err, file) => {
                console.log('======================??')
                if (err) {
                    console.log('some error in finding ID in removal', err)
                } else {
                    if (file) {
                        let room = file.room
                        let name = file.name
                        data.deleteOne({ id: socket.id }, err => {
                            if (err) {
                                console.log('some error in deleting user in disconnect', err)
                            } else {
                                console.log('data is deleted')

                                // io.to(user.room).emit('updateUserList', users.getUserList(user.room))


                                data.find({ room: room }, (err, file) => {
                                    if (err) {
                                        console.log('some error in finding room', err)
                                    } else {
                                        names = file.map(user => user.name)
                                        io.to(room).emit('updateUserList', names)
                                        io.to(room).emit('newMessage', generateMessage('Admin', `${name} Left the ${room} Room`))
                                    }
                                })
                                // io.to(user.room).emit('newMsg', generateMessage('Admin', `${user.name} has Left ${user.room}`))

                            }
                        })

                    }
                }
            })


        })



        socket.on('join', (params, callback) => {
            console.log('workingg')
            if (!isRealString(params.name) || !isRealString(params.room)) {
                return callback('Name and Room require')
            } else {
                socket.join(params.room)  //Creating or Joining Room by Client
                console.log('=============')

                // users.removeUser(socket.id) // checking he in another room
                data.findOne({ id: socket.id }, (err, file) => {
                    if (err) {
                        console.log('error in finding data while searching via id')
                    } else {
                        console.log('user is found by ID', file)
                        if (file) {
                            data.deleteOne({ id: socket.id }, err => {
                                if (err) {
                                    console.log('some error in deleting user inside Join', err)
                                } else {
                                    console.log('data is deleted')
                                }
                            })
                        }
                        // users.addUser(socket.id, params.name, params.room)
                        var temp = new data()
                        temp.id = socket.id
                        temp.name = params.name
                        temp.room = params.room
                        temp.save(err => {
                            if (err) {
                                console.log("some error in insertion of data in DB", err)
                            } else {
                                console.log('data is inserted in DataBase')
                            }


                            // io.to(params.room).emit('updateUserList', users.getUserList(params.room))
                            data.find({ room: params.room }, (err, file) => {
                                if (err) {
                                    console.log('some error in finding room', err)
                                } else {
                                    console.log('userList is send')
                                    let names = file.map(user => user.name)
                                    io.to(params.room).emit('updateUserList', names)
                                }
                            })
                        })


                        console.log(params.room, '----------------', socket.rooms)


                        socket.emit('newMessage', generateMessage('Admin', `${params.name} Welcome to chat application`))
                        socket.to(params.room).broadcast.emit('newMessage', generateMessage('Admin', `${params.name} join the Room `))

                        callback()
                    }
                })
            }
        })



        socket.on('createMessage', message => {
            console.log(message, "-----socket file")

            data.findOne({ id: socket.id }, (err, file) => {
                if (err) {
                    console.log('some error in finding user')
                } else {
                    if (file) {
                        io.to(file.room).emit('newMessage', generateMessage(file.name, message))
                    }
                }
            })

        })
    })

}

module.exports = SocketRun //Export Socket