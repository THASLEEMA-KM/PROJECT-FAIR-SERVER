const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtmiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const router = new express.Router()

//register- http://localhost:3000/register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add project
router.post('/project/add',jwtmiddleware,multerMiddleware.single('projImage'),projectController.addProjectController)

// home project
router.get('/get-home-projects',projectController.getHomeProjects)

// all projects
router.get('/all-projects',jwtmiddleware,projectController.allProjectsController)

// user projects
router.get('/user-projects',jwtmiddleware,projectController.getUserProjectsController)

// edit project
router.put('/project/:pid/edit',jwtmiddleware,multerMiddleware.single('projImage'),projectController.editProjectController)


// remove project
router.delete('/project/:pid/remove',jwtmiddleware,projectController.removeProjectController)

// edit profile
router.put('/user/edit',jwtmiddleware,multerMiddleware.single('profilePic'),userController.editProfileContorller)

module.exports = router
