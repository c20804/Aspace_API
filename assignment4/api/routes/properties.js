import express from "express";
import Property from "../models/property.js";

const router = express.Router();

//CREATE
router.post("/", async(req, res, next)=>{
    const newProperty = new Property(req.body);
    try{
        const savedProperty = await newProperty.save();
        res.status(200).json(savedProperty);
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
});
//UPDATE
router.put("/:id", async(req, res, next)=>{
    try{
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true});
        res.status(200).json(updatedProperty);
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
});
//DELETE
router.delete("/:id", async(req, res, next)=>{
    try{
        await Property.findByIdAndDelete(req.params.id);
        res.status(200).json("The property has been deleted!");
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
});
//GET
router.get("/:id", async(req, res, next)=>{
    try{
        const property = await Property.findById(req.params.id);
        res.status(200).json(property);
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
});
//GET ALL
router.get("/", async(req, res, next)=>{
    try{
        const properties = await Property.find();
        res.status(200).json(properties);
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
});


export default router;