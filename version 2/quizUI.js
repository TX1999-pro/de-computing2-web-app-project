const quizUI = Object.create(null);

quizUI.init = function (questions) {

    const el = (id) => document.getElementById(id);
    const cloneTemplate = function (id) {
        return document.importNode(el(id).content, true);
    };

};


export default Object.freeze(quizUI);