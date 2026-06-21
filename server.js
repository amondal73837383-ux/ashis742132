const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (तुम्हारा already use किया)
mongoose.connect("mongodb+srv://ASHIS-MONDAL:amondal..123A@cluster0.mongodb.net/portfolioDB?retryWrites=true&w=majority")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Message", messageSchema);

// API Route
app.post("/send", async (req, res) => {
    try {
        const data = new Message(req.body);
        await data.save();
        res.json({ success: true, message: "Message Sent Successfully ✅" });
    } catch (error) {
        res.json({ success: false, message: "Error ❌" });
    }
});

// Server
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});