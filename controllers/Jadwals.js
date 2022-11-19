import Jadwal from "../models/JadwalModel.js";
import User from "../models/UsersModel.js";
import {Op} from "sequelize";

export const getJadwals = async (req, res) =>{
    try {
        let response;
        if(req.role === "instruktur"){
            response = await Jadwal.findAll({
                include:[{
                    model: User
                }]
            });
        }else{
            response = await Jadwal.findAll({
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getJadwalById = async(req, res) =>{
   
}

export const createJadwal = async(req, res) =>{
    const {asisten, hari, kelas, waktu} = req.body;
    try {
        await Jadwal.create({
            asisten: asisten,
            hari: hari,
            kelas: kelas,
            waktu: waktu,
            userId: req.userId
        });
        res.status(201).json({msg: "Jadwal Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateJadwal = async(req, res) =>{
    
}

export const deleteJadwal = async(req, res) =>{
   
}