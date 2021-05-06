import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export function setEnvironment(app) {
    process.env.NODE_ENV = 'production';
    // process.env.NODE_ENV = 'development';
    if(process.env.NODE_ENV !== 'production') {
        setDevEnv(app);
    } else {
        setProdEnv(app)
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development';
    process.env.DB_URL = 'mongodb://localhost:27017/tt-db';
    process.env.TOKEN_SECRET = 'CareShowDriveThreeTwist';
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());
}

function setProdEnv(app) {
    process.env.NODE_ENV = 'production';
    process.env.DB_URL = 'mongodb://localhost:27017/tt-db';
    process.env.TOKEN_SECRET = 'JumpShoeAppleTripMouse';
    app.use(express.json());
    app.use(cors());
}