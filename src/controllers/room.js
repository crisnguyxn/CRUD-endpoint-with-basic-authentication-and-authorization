const asyncWrapper = require("../middlewares/async");
const Room = require("../models/room");

const createRoom = asyncWrapper(async(req,res) => {
    const roomData = req.body["dataRec"];
    Object.assign(roomData,{userId:req.body.userId})
    const data = await Room.create(roomData)
    res.status(200).json(data)
})

module.exports = {
    createRoom
}