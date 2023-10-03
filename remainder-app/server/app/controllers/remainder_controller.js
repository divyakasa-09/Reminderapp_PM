import express from 'express';
import {save,get,remove,search,update} from './../services/remainder_service.js'


export const post = async (req, res) => {
    try{

    const newRemainder = req.body;
    const savedreminder = await save(newRemainder);
    setSuccessfulResponse(savedreminder,res);

    } catch(err){
        setErrorResponse(err);
    }
  };

export const index =  async (req, res) => {
    try{
        const params = req.body;
        const remainders = await search(params);
        setSuccessfulResponse(remainders,res);
    } catch(err){
        setErrorResponse(err,res);
    }

}

export const find =  async (req, res) => {
    try{
        const id = req.params.id;
        const remainders = await get(id);
        setSuccessfulResponse(remainders,res);
    } catch(err){
        setErrorResponse(err,res);
    }

}

export const del =  async (req, res) => {
    try{
        const id = req.params.id;
        const remainders = await remove(id);
        res.status(200)
        res.json(`Remainder got deleted for id -  ${id}`);
    } catch(err){
        setErrorResponse(err,res);
    }

}


export const change =  async (req, res) => {
    try{
        const id = req.params.id;
        const updatedRemainder = req.body;
        console.log("updatedRemainder",updatedRemainder)
        const remainders = await update(id,updatedRemainder);
        console.log("remainders",remainders)
        remainders.lastModifiedDate = new Date();
        const updatedreminder = await remainders.save();
        console.log("updatedreminder",updatedreminder)
        res.status(200);
        res.json(`Remainder got updated for id -  ${id}`);
    } catch(err){
        res.status(404)
    res.json({
        Message : "Id Not Found"
    });
    }

}

const setSuccessfulResponse = (obj,res) => {
    res.status(200)
    res.json(obj);
}

const setErrorResponse = (err,res) => {
    res.status(500)
    res.json({
        error:{
            message:err.message
        }
    });
}

