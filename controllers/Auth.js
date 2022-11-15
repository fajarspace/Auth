import User from "../models/UsersModel.js";
import argon2 from "argon2";

export const login = async(req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const validasiPass = await argon2.verify(user.password, req.body.password);
    if(!validasiPass) return res.status(400).json({msg: "password salah!"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const username = user.username;
    const role = user.role;
    res.status(200).json({uuid, name, email, username, role})
}

export const HaloBang = async(req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "anda harus login terlebih dahulu"});
    }
    const user = await User.findOne({
        attributes: ['uuid','name','username','email','role'],
        where: {
            uuid: req.body.userId
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    res.status(200).json(user)
}

export const logOut = (req, res) => {
    req.session.destroy((err) =>{
        if(err) return res.status(400).json({msg: "tidak dapat logout"});
        res.status(200).json({msg: "anda telah logout"});
    });
}