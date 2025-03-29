const connection = require('../dbconnection');

const fetchComments = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Comment_ID, Comment FROM Comments';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const makeComment = (comment) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Comments (Comment) VALUES (?)';
        connection.query(query, [comment], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    fetchComments,
    makeComment
};
