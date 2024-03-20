const express = require('express');
const service = require('../services/employee_service');

const employeeRouter = express.Router();

employeeRouter.get('/',async (req, res)=>{
    try{
        const employees = await service.getAllEmployee();
        res.send(employees);
    } catch(e){
        res.status(500).send({error: e.sqlMessage});
    }
    
});

employeeRouter.get('/:id', async (req, res)=>{
    try{
        const employee = await service.getEmployeeById(req.params.id);
        if(employee == undefined){
            res.status(404).send({error: "record not found"});
        }
        res.send(employee);
    } catch(e){
        res.status(500).send({error: e});
    }
})

employeeRouter.delete('/:id', async (req, res)=>{
    try{
        const affectedRows = await service.deletEmployeeById(req.params.id);
        console.log(affectedRows);
        if(affectedRows == 0){
            res.status(404).send({error: "record not found"});
        }
        res.send({message: "deleted successfully"});
    } catch(e){
        res.status(500).send({error: e});
    }
})

employeeRouter.post('/', async (req, res)=>{
    try{
         await service.addOrEditEmployeeById(req.body);
        res.status(201).send({message: "record inserted successfully"});
    } catch(e){
        res.status(500).send({error: e});
    }
})

employeeRouter.put('/:id', async (req, res)=>{
    try{
        const affectedRows = await service.addOrEditEmployeeById(req.body, req.params.id);
        if(affectedRows == 0){
            res.status(404).send({message: "record not found"});
        }
        res.status(201).send({"affected records" : data});
    } catch(e){
        res.status(500).send({error: e});
    }
})

module.exports = employeeRouter;