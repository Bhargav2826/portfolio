const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    techStack: [String],
    githubLink: String,
    liveDemo: String,
    category: String,
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
