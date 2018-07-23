const conn = require('./connection')

function getRequests(id, testDb) {
    const db = testDb || conn
    let requests = {}

    return Promise.all([
        db('requests').where({ 'owner_id': id }), 
        db('requests').where({ 'requester_id': id })
    ])
    .then(([received, sent]) => {
        requests.received = received
        requests.sent = sent
        return requests
    })
}

function insertRequest(request, testDb) {
    const db = testDb || conn
    return db.insert([request], 'id')
        .into('requests')
}

module.exports = {
    getRequests,
    insertRequest
}