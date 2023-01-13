//implementing the strassen algorithm
//source code : https://gist.github.com/syphh/1cb6b9bb57a400873fa9d05cd1ee7cc3
import { Matrix } from "../matrix.mjs";
//n x n matrices only 

function splitMatrix(A){

    let n = A.shape[0];
    // console.log(n);
    let m1 = [];
    let m2 = [];
    let m3 = [];
    let m4 = [];

    A.matrix.slice(0, n / 2).map((subList) => {
        m1.push(subList.slice(0, n/2));
    });
    A.matrix.slice(0, n/2).map( (subList) => {
        m2.push(subList.slice(n/2, n));
    })
    A.matrix.slice(n/2, n).map( (subList) => {
        m3.push(subList.slice(0, n/2))
    })
    A.matrix.slice(n/2, n).map( (subList) => {
        m4.push(subList.slice(n/2, n));
    })

    m1 = new Matrix(m1);
    m2 = new Matrix(m2);
    m3 = new Matrix(m3);
    m4 = new Matrix(m4);
    console.log(m1.shape);
    console.log(m2.shape);
    console.log(m3.shape);
    console.log(m4.shape);

    return [m1, m2, m3, m4]; //return the class Matrix 
}


function strassen(A, B){
    
    if (A.shape[0] <= 2){
        return Matrix.dot(A, B);
    }
    let [a,b,c,d] = splitMatrix(A);
    let [e,f,g,h] = splitMatrix(B);
    // console.log(a);
    // console.log(d);
    // console.log(e);
    let p1 = strassen(Matrix.add(a, d), Matrix.add(e,h));
    let p2 = strassen(d, Matrix.minus(g, e));
    let p3 = strassen(Matrix.add(a, b), h);
    let p4 = strassen(Matrix.minus(b, d), Matrix.minus(g, h));
    let p5 = strassen(a, Matrix.minus(f,h));
    let p6 = strassen(Matrix.add(c, d), e);
    let p7 = strassen(Matrix.minus(a, c), Matrix.add(e, f));
    // console.log("BELOW p7");
    let C11 = p1 + p2 - p3 + p4;
    let C12 = p5 + p3;
    let C21 = p6 + p2;
    let C22 = p5 + p1 - p6 - p7;
    let C = [];
    console.log(C11);
    console.log(C12);
    C.matrix.push(C11);
    C.matrix.push(C12);
    C.matrix.push(C21);
    C.matrix.push(C22);
    C = new Matrix(C);
    return C;
}


let t1 = new Matrix([[4,5,3,2],[4,6,3,2],[3,5,23,2],[4,5,6,3]]);
let t2 = new Matrix([
    [5,5,5,5],[3,5,4,3],[65,7,4,3],[5,6,3,3]
]);

// console.log(splitMatrix(t1));
console.log(strassen(t1 , t2));

// console.log(Matrix(t1);

