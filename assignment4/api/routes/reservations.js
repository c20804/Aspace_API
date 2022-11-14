import express from "express";
import Reservation from "../models/Reservation.js";
import Property from "../models/Property.js";

const router = express.Router();

//CREATE (userID required)
router.post("/:userID/:propertyID", async(req, res, next)=>{
    const propertyID = req.params.propertyID;
    const userID = req.params.userID;
    const newReservation = new Reservation({ date: new Date(req.body.date), userID:userID, propertyID:propertyID});
    try{
        const savedReservation = await newReservation.save();
        try {
            await Property.findByIdAndUpdate(propertyID, {
              $push: { unAvailable: savedReservation.date },
            });
          } catch (err) {
            next(err);
          }
        res.status(200).json(savedReservation);
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
});

// //UPDATE
// router.put("/:id", async(req, res, next)=>{
//     try{
//         const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true});
//         res.status(200).json(updatedReservation);
//     }catch(err){
//         next(err);
//         // res.status(500).json(err);
//     }
// });

//DELETE
router.delete("/:id", async(req, res, next)=>{
    try{
        const delReversation = await Reservation.findByIdAndDelete(req.params.id);
        const propertyID = delReversation.propertyID;
        try {
            await Property.findByIdAndUpdate(propertyID, {
              $pull: { unAvailable: delReversation.date },
            });
          } catch (err) {
            next(err);
          }
        res.status(200).json("The reservation has been deleted!");
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
});
//GET one
router.get("/:id", async(req, res, next)=>{
    try{
        const reservation = await Reservation.findById(req.params.id);
        res.status(200).json(reservation);
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
});
//GET ALL (userID required)
router.get("/user/:userID", async(req, res, next)=>{
    const userID = req.params.userID;
    try{
        const reservations = await Reservation.find({
            "userID" : userID
        });
        res.status(200).json(reservations);
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
});


export default router;