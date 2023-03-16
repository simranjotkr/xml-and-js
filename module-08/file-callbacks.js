const fs = require("fs");
let filename = `${__dirname}/books.json`;

// fs.exists(filename, (exists) => {
//   if (exists) {
//     fs.stat(filename, (err, stats) => {
//       if (err) {
//         throw err;
//       }
//       if (stats.isFile()) {
//         fs.readFile(filename, null, (err, data) => {
//           if (err) {
//             throw err;
//           }
//           console.log(JSON.parse(data));
//         });
//       } else {
//         throw new Error("This location contains not a file");
//       }
//     });
//   } else {
//     throw new Error("404: file not found");
//   }
// });

const checkIfExists = (filename) => new Promise((resolve, reject) => {
    fs.exists(filename, (exists) => {
      if(exists) resolve();
      else reject("404: file not found");
    })
})

const checkIfFile = (filename) => new Promise((resolve, reject) => {
    fs.stat(filename, (err, stats)=> {
      if(err || !stats.isFile()) {
        reject(err || "This location contains not a file");
      } else {
        resolve();
      }
    })
})

const readFile = (filename) => new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data)=> {
          if(err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
      })  
})

// checkIfExists(filename)
//       .then(() => checkIfFile(filename))
//       .then(() => readFile(filename))
//       .then((data) => console.log(data))
//       .catch(err => console.error(err));
Promise.all([readFile(filename), checkIfFile(filename), readFile(filename)]).then((data) => {
  console.log(data);
});