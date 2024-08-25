import {Request, Response} from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
    try{
        const {auth0Id} = req.body;
        const exisitingUser = await User.findOne({auth0Id});
        if(exisitingUser){
            return res.status(200).send();
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser.toObject());
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : "Error creating the user"});
    }
};

export default {
    createCurrentUser,
}