import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add', (req,res)=>{
    res.render('personas/add');
});

router.post('/add', async(req, res)=>{
    try{
        const {cc, name, lastname, age, phone, address} = req.body;
        const newPersona = {
            cc, name, lastname, age, phone, address
        }
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM personas');
        res.render('personas/list', {personas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:cc', async(req, res)=>{
    try{
        const {cc} = req.params;
        const [persona] = await pool.query('SELECT * FROM personas WHERE cc = ?', [cc]);
        const personaEdit = persona[0];
        res.render('personas/edit', {persona: personaEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:cc', async(req, res)=>{
    try{
        const {name, lastname, age, phone, address} = req.body;
        const {cc} = req.params;
        const editPersona = {name, lastname, age, phone, address};
        await pool.query('UPDATE personas SET ? WHERE cc = ?', [editPersona, cc]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:cc', async(req, res)=>{
    try{
        const {cc} = req.params;
        await pool.query('DELETE FROM personas WHERE cc = ?', [cc]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;