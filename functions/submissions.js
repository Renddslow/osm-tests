const fauna = require('faunadb');

const q = fauna.query;
const client = new fauna.Client({
    secret: process.env.FAUNA_KEY || '',
    domain: 'db.fauna.com',
    scheme: 'https',
});

exports.handler = async function (event) {
    const payload = JSON.parse(event.body);

    // Ensure no extra data is sent
    const data = {
        name: payload.name,
        answers: payload.answers || [],
        id: payload.id,
        created_at: (new Date()).toISOString(),
    }

    await client.query(q.Create(q.Collection('tests'), { data }));

    return {
        statusCode: 200,
    }
}