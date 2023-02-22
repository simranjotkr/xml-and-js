const data = [
    { born: 1870, died: 1924 },
    { born: 1893, died: 1976 },
    { born: 1869, died: 1948 },
    { born: 1901, died: 1989 },
];

const ages = data.map(({ born, died }) => died - born)
    .filter(age => age > 75)
    .reduce((acc, age) => {
        if (age > acc) {
            acc = age;
        }
        return acc
    }, 0);

console.log(ages);    