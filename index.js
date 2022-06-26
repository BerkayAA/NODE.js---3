const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');


const readfilePromise = filename =>{
    return new Promise((resolve,rejects) =>{
        fs.readFile(filename,(err,data)=>{
            err != null ? rejects(err) : resolve(data);
        });
    });
}


const writefilePromise = (fileName,fileData) => {
    return new Promise((resolve,rejects) => {
        fs.writeFile(fileName,fileData,(err) => {
            err != null ? rejects(err): resolve('there is not any error');
        });
    });
}
// readfilePromise(`${__dirname}/dog-name.txt`)
//     .then((data) => {
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     }) 
//     .then(response => {
//         console.log(response.body.message);        
//     return writefilePromise('promiseFile.txt',response.body.message); 
//     })
//     .then((promiseResponse) => {
//         console.log(promiseResponse);
//     })
//     .catch(suparagentError => {
//         console.log(suparagentError);
//     });


    //? Promises, await and async 

const getDogPicture = async () => {
    try {
        const dogName = await readfilePromise(`${__dirname}/dog-name.txt`);
        const dogData1 = superagent.get(`https://dog.ceo/api/breed/${dogName}/images/random`);
        const dogData2 = superagent.get(`https://dog.ceo/api/breed/${dogName}/images/random`);
        const dogData3 = superagent.get(`https://dog.ceo/api/breed/${dogName}/images/random`);

        const all = await Promise.all([dogData1, dogData2, dogData3]);
        const images =  all.map(e => e.body.message);
        console.log(images);
        const writtenFile = await writefilePromise('async-await-promise.txt', images.join('\n'));
    } catch (err) {
        console.log(err);       
    }
    return 'process completed';
}

// (async () => {
//     console.log('print 1');
//     await getDogPicture().then((response) => {
//         console.log(response);
//         console.log('prnt inside the getDogPicture');
//     });
//     console.log('print 2');
//  })();


 (async () => {
    console.log('print 1');
    const getPicturVariable =  await getDogPicture();
    console.log(getPicturVariable);
    console.log('print 2');
 })();