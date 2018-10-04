class Job = require('./Job');

module.exports = class Jobs {
    constructor() {
        this.jobs = new Map();
    }

    read(id) {
        return this.jobs.get(id);
    }

    all() {
        return [...this.jobs.values()];
    }

    write(data) {
        const { title, desc, salary } = data;
        const job = new Job(title, desc, salary);
        this.jobs.set(job.id, job);
        return job;
    }

    delete(id) {
        this.jobs.delete(id);
    }

    modify(id, newDesc, newSal) {
        const job = this.jobs.get(id);
        job.desc = newDesc;
        job.salary = newSal;
        job.title = newTitle;
        return job;
    }

};
