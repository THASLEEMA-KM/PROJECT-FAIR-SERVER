const projects = require('../models/projectModel')

// add Projects
exports.addProjectController = async (req,res)=>
    {
        console.log("Inside Project Controll ");
        const {title,languages,overview,github,website} = req.body
        const userId = req.payload
        const projImage = req.file.filename
        console.log(title,languages,overview,github,website,userId,projImage);
        try {
            const existingProject = await projects.findOne({github})
            if(existingProject)
                {
                    res.status(406).json("Project already in our DB..,Please Add another one")

                }else{
                    const newProject = new projects({
                        title,languages,overview,github,website,projImage,userId
                    })
                    await newProject.save()
                    res.status(200).json(newProject)

                }
        } catch (error) {
            res.status(401).json(error)

        }

    }

// home Projects
exports.getHomeProjects = async (req,res)=>
    {
        console.log("Inside getHomeProjects");
        try {
            const homeProjects = await projects.find().limit(3)
            res.status(200).json(homeProjects)
        } catch (error) {
            res.status(401).json(error)
        }
    }

// all projects
exports.allProjectsController = async (req,res)=>
    {
        console.log("Inside allprojects");
        try {
            const allprojects = await projects.find()
            res.status(200).json(allprojects)
        } catch (error) {
            res.status(401).json(error)
        }
    }

// user projects
exports.getUserProjectsController = async (req,res)=>
    {
        console.log("Inside getUserprojectsController");
        const userId = req.payload
        try {
            const userProjects = await projects.find({userId})
            res.status(200).json(userProjects)
        } catch (error) {
            res.status(401).json(error)
        }
    }