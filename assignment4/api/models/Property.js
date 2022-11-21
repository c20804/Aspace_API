import mongoose from 'mongoose';

// change nested address to city and address detail 
const PropertySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    image: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amenities: {
        type: String,
    },
    unAvailable: {
        type: [Date],
    },
    comments: {
        type: [String],
    },
    hostID:{
        type: String,
        // required: true,
    },
});

export default mongoose.models.Property || mongoose.model("Property", PropertySchema)