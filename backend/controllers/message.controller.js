import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        
        // await conversation.save();
        // await newMessage.save();
        
        //this will run in parallel
        await Promise.all([conversation.save(),newMessage.save()]);
        
        
        // socket to connections
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
};


export const getMessages = async (req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([])
        }

        const messages = conversation.messages;
        
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params; // The ID of the message to be deleted
        const senderId = req.user._id; // ID of the current user (sender)

        // Find the message to ensure it exists and is sent by the current user
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        if (message.senderId.toString() !== senderId.toString()) {
            return res.status(403).json({ error: 'You can only delete your own messages' });
        }

        // Remove the message from the database
        await Message.findByIdAndDelete(messageId);

        // Remove the message ID from the conversation's messages array
        await Conversation.updateOne(
            { participants: { $in: [senderId, message.receiverId] }, messages: messageId },
            { $pull: { messages: messageId } }
        );

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};