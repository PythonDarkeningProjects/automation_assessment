const uuid = require("uuid");
const assert = require("assert");

function generateUUID(numOfChars) {
    assert(numOfChars <= 36, "Number of characters should be less than or equal to 36");
    let uuid_x = uuid.v4().substring(0, numOfChars);
    return uuid_x;
}


module.exports = {
    generateUUID
};