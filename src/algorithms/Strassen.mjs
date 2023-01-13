//implementing the strassen algorithm
//source code : https://gist.github.com/syphh/1cb6b9bb57a400873fa9d05cd1ee7cc3
import { Matrix } from "../matrix.mjs";
//n x n matrices only 

function splitMatrix(A){

    let n = A.shape[0];
    console.log(n);
    let m1 ;
    let m2 ;
    let m3 ;
    let m4 ;

    A.matrix.slice(0, n / 2).map((subList) => {
        m1 = new Matrix(subList.slice(0, n/2));
        // console.log("test");
    });
    A.matrix.slice(0, n/2).map( (subList) => {
        m2 = new Matrix(subList.slice(n/2, n));
    })
    A.matrix.slice(n/2, n).map( (subList) => {
        m3 = new Matrix(subList.slice(0, n/2));
    })
    A.matrix.slice(n/2, n).map( (subList) => {
        m4 = new Matrix(subList.slice(n/2, n));
    })

    return [m1, m2, m3, m4]; //return the class Matrix 
}


function strassen(A, B){
    if (A.shape[0] <= 2){
        return Matrix.dot(A, B);
    }
    let [a,b,c,d] = splitMatrix(A);
    let [e,f,g,h] = splitMatrix(B);
    let p1 = strassen(Matrix.add(a, d), Matrix.add(e,h));
    let p2 = strassen(d, Matrix.minus(g, e));
    let p3 = strassen(Matrix.add(a, b), h);
    let p4 = strassen(Matrix.minus(b, d), Matrix.minus(g, h));
    let p5 = strassen(a, Matrix.minus(f,h));
    let p6 = strassen(Matrix.add(c, d), e);
    let p7 = strassen(Matrix.minus(a, c), Matrix.add(e, f));
    let C11 = p1 + p2 - p3 + p4;
    let C12 = p5 + p3;
    let C21 = p6 + p2;
    let C22 = p5 + p1 - p6 - p7; //22, are the i, j indexes
    //PROBLEM HOW ARE WE GOING TO PUT TOGETHER C11, C22 etc... to fit into one matrix;
    // let C = new Matrix();
    let C = new Matrix();
    C.matrix.push(C11);
    C.matrix.push(C12);
    C.matrix.push(C21);
    C.matrix.push(C22);
    return C;
}


let t1 = new Matrix([[4,5,3,2],[4,6,3,2],[3,5,23,2],[4,5,6,3]]);
let t2 = new Matrix([
    [5,5,5,5],[3,5,4,3],[65,7,4,3],[5,6,3,3]
]);

console.log(splitMatrix(t1));

