import { Router } from "express";
import fetch from "isomorphic-fetch";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const cors = require("cors");

async function userFetch(url){
    const res = await fetch(url);
    const  data = await res.json();
    return data;

}

async function insertUserInBase(user){
    let data = {}
    console.log("user",user)
    for (const [key, value] of Object.entries(user)) {
        if (value) {
            if(key == "login") data[key] = value.toLowerCase()
            else{
                 data[key] = value;
            }
        }
    }
    console.log("data",data)
    await prisma.user.create({data});
    return data;
}


const api = Router();

api.get("/:username", async (request, response) => {
    const { username } = request.params;
    const url = `https://api.github.com/users/${username}`
    const user_query = await prisma.user.findUnique({
        where: {
            login: username.toLowerCase()
        }
    });
    console.log("us:", user_query);

    if(!user_query){
        const user = await userFetch(url);
        if(user.message) {
            response.json({message:user.message})
            console.log("message",user.message);}
        else{
            const data = await insertUserInBase(user); 
            const query = await prisma.user.findUnique({
                where:{
                login: data.login
                } 
            });
            response.json({query});

        } 
    }
    else{
        response.json({user_query});
        console.log("git: ",user_query);
    }  
    });


export default api;
