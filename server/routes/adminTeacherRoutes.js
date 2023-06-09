import { Router } from "express";
import {createTeacher,
        getTeachers,
        getTeacher,
        updateTeacher,
        deleteTeacher}
        from '../controllers/adminTeacherController.js';

const router = Router();
/*Traemos toda la información referente a los maestros*/
router.get('/adminTeacher',getTeachers);
/*Obtenemos la información de un maestro en particular con base en su id*/
router.get('/adminTeacher/:codigo',getTeacher);
/*Agregegamos un nuevo maestro a la db*/
router.post('/adminTeacher',createTeacher);
/*Editamos la información de un maestro en partiular con base en su id*/
router.put('/adminTeacher/:codigo',updateTeacher);
/*Elminamos un maesteo de la db con base en su id*/
router.delete('/adminTeacher/:codigo',deleteTeacher);

export default router;