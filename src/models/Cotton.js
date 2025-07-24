import mongoose from 'mongoose';



const cottonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Cotton = mongoose.model('Cotton', cottonSchema);

export default Cotton;