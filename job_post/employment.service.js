const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.job_posts.findAll();
}

async function getById(id) {
    return await getById(id);
}

async function create(params) {
    // save user
    await db.job_posts.create(params);
}



async function update(id, params) {
    const job_posts = await getjobFair(id);
    // validate
    const jobFairameChanged = params.id && job_posts.id !== params.id;
    if (jobFairameChanged && await db.job_posts.findOne({ where: { id: params.id } })) {
        throw 'Username "' + params.id + '" is already taken';
    }

    // copy params to user and save
    Object.assign(job_posts, params);
    await job_posts.save();

    return job_posts.get();
}



async function _delete(id) {
    const job_posts = await getjobFair(id);
    await job_posts.destroy();
}

// helper functions

async function getjobFair(id) {
    const job_posts = await db.job_posts.findByPk(id);
    if (!job_posts) throw 'Job Fair not found';
    return job_posts;
}