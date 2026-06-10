const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        // Return a successful 200 status with a flag so the browser console doesn't show red 500 errors
        res.status(200).json({ dbOffline: true });
    }
};

// @desc    Create a project
// @route   POST /api/projects
const createProject = async (req, res) => {
    const { title, description, image, techStack, githubLink, liveDemo, category } = req.body;

    const project = new Project({
        title, description, image, techStack, githubLink, liveDemo, category
    });

    try {
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        // Return 200 OK with flag to prevent browser console red errors
        res.status(200).json({ dbOffline: true });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Handle 'undefined' string or empty ID
        if (!id || id === 'undefined' || id === 'null') {
            console.warn('Attempted to delete project with invalid ID:', id);
            return res.status(400).json({ message: 'Invalid Project ID provided' });
        }

        // Validate ObjectId format
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Project ID is in an invalid format' });
        }

        const project = await Project.findById(id);
        if (project) {
            await Project.deleteOne({ _id: project._id });
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        // Return 200 OK with flag to prevent browser console red errors
        res.status(200).json({ dbOffline: true });
    }
};

module.exports = { getProjects, createProject, deleteProject };
