import mongoose from 'mongoose';


const ReservationSchema = new mongoose.Schema({
    // userEmail:{
    //     type: String,
    //     required: true,
    // },
    propertyID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    }
});

export default mongoose.model("Reservation", ReservationSchema)