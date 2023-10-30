const handleSocketDisconnect = (socket) => {
  for (const room of socket.rooms) {
    if (room !== socket.id) {
      socket.to(room).emit('userHasLeftRoom', socket.data.userId);
    }
  }
  console.log('Close connection');
  socket.leave();
};

module.exports = { handleSocketDisconnect };
