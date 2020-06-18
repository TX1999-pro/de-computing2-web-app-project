const F = Object.create(null);

F.shuffle = function(arr) {
    let ctr = arr.length;
    let temp;
    let index;
    // while there are elements in the arrary
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr = ctr - 1;
        // Swap the last element with it
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
};


export default Object.freeze(F);
