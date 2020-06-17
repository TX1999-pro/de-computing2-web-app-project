
// takes an object and returns an object from the server to the client side

const handler = function (obj) {
    console.log(obj);
    return {"message": "received"};
};

export default Object.freeze(handler);
