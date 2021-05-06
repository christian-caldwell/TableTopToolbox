import express from 'express';
const app = express();
import {registerRoutes} from './routes';
import {connectToDB} from './utilities/db';
import {setEnvironment} from './utilities/env';
import path from 'path';

setEnvironment(app);
connectToDB()
registerRoutes(app);

if (process.env.NODE_ENV.toString().trim() === 'production'){
    app.use(express.static(path.join(__dirname, 'build')))
}

app.get('*', (req, res) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production'){
        res.send('Running Server In Development Mode')
    } else {
        res.send('Running Server In Production Mode')
        res.sendFile(path.join(__dirname + '/build/index.html'));
    }
})

app.listen(8000, () => {
    console.log('Listening on port 8000');
})