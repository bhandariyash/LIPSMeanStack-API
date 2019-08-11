import express from 'express';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { userRoute } from './routes/userRoute';
import { productRoute } from './routes/productRoute';
import { todoRoute } from './routes/todoRoute';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { createLogger, transports } from 'winston';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
config();

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json('get call');
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods",
        "GET, PUT, POST, OPTIONS, DELETE");
    next();
});

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({filename:'server.log'})
    ]
});

app.use((req: Request, res: Response, next: NextFunction) => {
    logger.log({
        level: 'info',
        message: JSON.stringify(req.body)
    });

    next();
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/todo', todoRoute);
mongoose.connect(process.env.DB || '',
    { useNewUrlParser: true }).then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log('server started at 8000');
        });
    });
