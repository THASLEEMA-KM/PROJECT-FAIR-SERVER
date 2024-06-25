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
        const searchKey = req.query.search
        const query = {
            languages : {
                $regex:searchKey,$options:"i"
            }
        }
        try {
            const allprojects = await projects.find(query)
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

// edit Project
exports.editProjectController = async (req,res) =>
    {
        console.log("Inside editProjectController");
        const {pid} = req.params
        const {title,languages,overview,github,website,projImage} = req.body
        const uploadimage = req.file?req.file.filename:projImage
        const userId = req.payload
        try {
            const updatedProject = await projects.findByIdAndUpdate({_id:pid},{title,languages,overview,github,website,projImage:uploadimage,userId},{new:true})
            await updatedProject.save()
            res.status(200).json(updatedProject)
        } catch (error) {
            res.status(401).json(error)
        }
    }

// remove project
exports.removeProjectController = async (req,res) =>
    {
        console.log("Inside removeProjectController");
        const {pid} = req.params
        try {
            const removedProject = await projects.findByIdAndDelete({_id:pid})
            res.status(200).json(removedProject)
        } catch (error) {
            res.status(401).json(error)
        }
    }