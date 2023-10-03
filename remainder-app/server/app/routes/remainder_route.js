import express from "express";
import * as remainderController from './../controllers/remainder_controller.js'
import route from "./index.js";


const Router = express.Router();

Router.route('/')
    .post(remainderController.post)
    .get(remainderController.index);


Router.route('/:id')
    .get(remainderController.find)
    .delete(remainderController.del)
    .put(remainderController.change);



    

export default Router;