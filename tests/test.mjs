//in the name of the most merciful and the all merciful;
//TESTING 
// import { NeuralNet } from "../main.mjs";
// import { Matrix } from "../matrix.mjs";
import { Matrix } from "../src/matrix.mjs";
import { activationFunctions } from "../src/Active.mjs";
// let input = new Matrix([
//     [1,0.1,6,19],
//     [1.2,4,5,0],
//     [0.9,6,7,0],
//     [49,56,6,0]
// ])
// let trueValue = new Matrix([
//     [0,1,45,9],
//     [6,8,31,1],
//     [5,7,8,0],
//     [10,4,69,9.0]
// ]);
// const model = new NeuralNet({
//     size: [4,4], //input size
//     name: "test",
//     activation: "sigmoid",
//     lossFunction: "linearLoss",
//     Layers: 2,
//     lossFunction: "linearLoss",
// });
// console.log(model.getResult(input, trueValue).loss);
// let t = [[1,32,4], [4,56,6]];
// console.log(t.length);
// let t = [() => {if (1==1) return [true]}];
// // console.log(t()
// let t = undefined;
// console.log(typeof(t));
// console.log(10%2); //si divisibele == 0
// console.log(10%3);
// console.log(10%4);
// // console.log(bool(1));
// // console.log(bool(0));

let t = new Matrix([
    [1,2,34,4],
    [45,5,5,5],
    [4,4,4,4],
    [45,5,55,5]
])



// console.log(t.matrix[0])

// let t = []
// console.log(t[0].length);
// // console.log()ff;d

// activationFunctions.softMax(t).repr();
// let [t1, t2, t3, t4] = t.quadSplit();
// console.log(t.repr());
// console.log(t1.status());

// for (let subMatrix of t.quadSplit()){
//     // console.log(subMatrix;
//     console.log(subMatrix.constructor.name);
// }