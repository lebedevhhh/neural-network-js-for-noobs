//implementing the strassen algorithm
//source code : https://gist.github.com/syphh/1cb6b9bb57a400873fa9d05cd1ee7cc3
import { Matrix } from "../matrix.mjs";
//n x n matrices only 

function splitMatrix(A){
    let n = A.shape[0];
    let m1;
    let m2;
    let m3;
    let m4;
    A.matrix.slice(0, n / 2).map((subList) => {
        m1 = subList.slice(0, n/2);
    });
    A.matrix.slice(0, n/2).map( (subList) => {
        m2 = subList.slice(n/2, n);
    })
    A.matrix.slice(n/2, n).map( (subList) => {
        m3 = subList.slice(0, n/2);
    })
    A.matrix.slice(n/2, n).map( (subList) => {
        m4 = subList.slice(n/2, n);
    })

    return [m1, m2, m3, m4];
}

function strassen(A, B){
    if (A.matrix.shape[0] <= 2){
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
    let C = new Matrix();
    return C;
}