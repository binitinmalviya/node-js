const array = [1, 2, [3, 4, [5, 6, 7, 8], [76, 76, 89, 12, 34, 55]], [12, 34, 45, 67, 78, 78]];



function flat(array) {
    const flatArray = [];
    for (let i = 0; i < array.length; i++) {

        if (Array.isArray(array[i])) {
            //  if get index value id item so we can call same function again for retrieve value nad push into same array
            flatArray.push(...flat(array[i]))
        } else {
            flatArray.push(array[i]);
        }
    }

    return flatArray;
}

const abc = flat(array);

console.log('Pre',array);
console.log('After',abc);