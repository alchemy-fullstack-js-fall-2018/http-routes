const Job = require('./Job');

class Jobs {
    constructor() {
        this.jobs = new Map();
    }

    read(id) {
        return this.jobs.get(id);
    }

    readAll() {
        return [...this.jobs.values()];
    }

    write(data) {
        const { title, desc, salary } = data;
        const job = new Job(title, desc, salary);
        this.jobs.set(job.id, job);
        console.log(this.jobs);
        return job;
    }

    delete(id) {
        this.jobs.delete(id);
    }

    modify(id, NewTitle, newDesc, newSal) {
        const job = this.jobs.get(id);
        job.title = newTitle;
        job.desc = newDesc;
        job.salary = newSal;
        return job;
    }

}

module.exports = new Jobs();
