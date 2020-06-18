
// takes an object and returns an object from the server to the client side

const handler = function (obj) {
    /** handle the username and his score sent by the client */

    return Promise.resolve(obj);
};

export default Object.freeze(handler);
