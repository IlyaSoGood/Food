'use sctrict';

const funds = [
    {amount: -1400},
    {amount: 2400},
    {amount: -1000},
    {amount: 500},
    {amount: 10400},
    {amount: -11400}
];

const getPositiveIncomeAmount = (data) => {
    return data.filter(item => item.amount > 0).reduce((acc, curr) => (typeof(acc) === 'object' ? acc.amount : acc) + curr.amount);
};
// console.log(getPositiveIncomeAmount(funds));

const getTotalIncomeAmount = (data) => {
    // if (data.some(item => item.amount < 0)) {
    //     return data.reduce()
    // }
    return data.some(item => item.amount < 0) ? data.reduce((acc, curr) => (typeof(acc) === 'object' ? acc.amount : acc) + curr.amount) : getPositiveIncomeAmount(data);
};

console.log(getTotalIncomeAmount(funds));

let [a, b, c] = new Set([1, 2, 3]);
console.log(a);
console.log(b);
console.log(c);

const arr = [
    {
        name: 'Alex',
        salary: 500
    },
    {
        name: 'Ann',
        salary: 1500
    },
    {
        name: 'John',
        salary: 2500
    },
];

const result = arr.map(item => Object.entries(item));

console.log(result);
