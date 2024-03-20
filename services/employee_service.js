const db = require('../db')

const getAllEmployee = async () => {
    try {
        const [records] = await db.query("SELECT * FROM Employees");
        return records;
    } catch (e) {
       throw e;
    }
}

const getEmployeeById = async (id)=>{
    try{
        const [[record]] = await db.query("SELECT * FROM Employees WHERE ID = ?",[id]);
        return record;
    } catch(e){
        throw e;
    }
}

const deletEmployeeById = async (id)=>{
    try{
        const [{affectedRows}] = await db.query("DELETE FROM Employees WHERE ID = ?", [id]);
        return affectedRows;
    } catch(e){
        throw e;
    }
}

const addOrEditEmployeeById = async (obj, id=0)=>{
    try{
        const [[[{affectedRows}]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)", [id, obj.name, obj.employee_code, obj.salary]);
        return affectedRows;
    } catch(e){
        throw e;
    }
}

module.exports = {getAllEmployee,getEmployeeById,deletEmployeeById,addOrEditEmployeeById};