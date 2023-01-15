//implementing the strassen algorithm
//source code : https://gist.github.com/syphh/1cb6b9bb57a400873fa9d05cd1ee7cc3
import { Matrix } from "../matrix.mjs";
//n x n matrices only 

export function splitMatrix(A){

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

    return [m1, m2, m3, m4]; //return the class Matrix 
}

//O(n2), but only 4 matrices
export function cpy(C11, C12, C21, C22){

    let m1 = [];
    let m2 = [];
    let m3 = [];
    let m4 = [];

    C11.matrix.map( (l) => {
        l.map( (item) => {
            m1.push(item);
        })
    })
    C12.matrix.map( (l) => {
        l.map( (item) => {
            m2.push(item)
        })
    })

    C21.matrix.map( (l) => {
        l.map( (item) => {
            m3.push(item)
        })
    })
    
    C22.matrix.map( (l) => {
        l.map( (item) => {
            m4.push(item)
        })
    })

    return [m1, m2, m3 , m4]; 
}


export function strassen(A, B){
    
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
    let C11 = Matrix.minus(Matrix.add(p1 , p2) , Matrix.add(p3 ,p4));
    let C12 = Matrix.add(p5 , p3);
    let C21 = Matrix.add(p6 , p2);
    let C22 = Matrix.minus(Matrix.add(p5 , p1) , Matrix.minus(p6 , p7));
    let C = [];
    let [m1, m2, m3, m4] = cpy(C11, C12, C21, C22);
    C.push(m1);
    C.push(m2);
    C.push(m3);
    C.push(m4);
    C = new Matrix(C);
    return C;
}
