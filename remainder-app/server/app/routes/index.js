import app from '../app.js';
import remainderRouter from './remainder_route.js'

const route = (app) =>{
    app.use('/reminders',remainderRouter);
}

export default route;