import Jadwal from "../models/JadwalModel.js";
import User from "../models/UsersModel.js";
import {Op} from "sequelize";

export const getJadwals = async (req, res) =>{
    try {
        let response;
        if(req.role === "instruktur"){
            response = await Jadwal.findAll({
                attributes:['uuid','asisten','hari','kelas','waktu'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Jadwal.findAll({
                attributes:['uuid','asisten','hari','kelas','waktu'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getJadwalById = async(req, res) =>{
    try {
        const jadwal = await Jadwal.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!jadwal) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "instruktur"){
            response = await Jadwal.findOne({
                attributes:['uuid','asisten','hari','kelas','waktu'],
                where:{
                    id: req.params.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Jadwal.findOne({
                attributes:['uuid','asisten','hari','kelas','waktu'],
                where:{
                    [Op.and]:[{id: jadwal.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
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
    try {
        const jadwal = await Jadwal.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!jadwal) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {asisten, hari, kelas, waktu} = req.body;
        if(req.role === "instruktur"){
            await Jadwal.update({asisten, hari, kelas, waktu},{
                where: {
                    id: jadwal.id
                }
            })
        }else{
            if(req.userId !== jadwal.userId) return res.status(403).json({msg: "akses tertolack!"});
            await Jadwal.update({asisten, hari, kelas, waktu},{
                where:{
                    [Op.and]:[{id: jadwal.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg: "jadwal updated!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteJadwal = async(req, res) =>{
    try {
        const jadwal = await Jadwal.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!jadwal) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {asisten, hari, kelas, waktu} = req.body;
        if(req.role === "instruktur"){
            await Jadwal.destroy({
                where: {
                    id: jadwal.id
                }
            })
        }else{
            if(req.userId !== jadwal.userId) return res.status(403).json({msg: "akses tertolack!"});
            await Jadwal.destroy({
                where:{
                    [Op.and]:[{id: jadwal.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg: "jadwal deleted!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}