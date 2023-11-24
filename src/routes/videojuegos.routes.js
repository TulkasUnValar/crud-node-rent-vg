import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/addVid', (req,res)=>{
    res.render('videojuegos/addVid');
});

router.post('/addVid', async(req, res)=>{
    try{
        const {cod, videogame_name, year, platform, producer, director} = req.body;
        const newVideojuego = {
            cod, videogame_name, year, platform, producer, director
        }
        await pool.query('INSERT INTO videojuegos SET ?', [newVideojuego]);
        res.redirect('/listVid');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/listVid', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM videojuegos');
        res.render('videojuegos/listVid', {videojuegos: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/editVid/:cod', async(req, res)=>{
    try{
        const {cod} = req.params;
        const [videojuego] = await pool.query('SELECT * FROM videojuegos WHERE cod = ?', [cod]);
        const videojuegoEdit = videojuego[0];
        res.render('videojuegos/editVid', {videojuego: videojuegoEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/editVid/:cod', async(req, res)=>{
    try{
        const {videogame_name, year, platform, producer, director} = req.body;
        const {cod} = req.params;
        const editVideojuego = {videogame_name, year, platform, producer, director};
        await pool.query('UPDATE videojuegos SET ? WHERE cod = ?', [editVideojuego, cod]);
        res.redirect('/listVid');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:cod', async(req, res)=>{
    try{
        const {cod} = req.params;
        await pool.query('DELETE FROM videojuegos WHERE cod = ?', [cod]);
        res.redirect('/listVid');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;