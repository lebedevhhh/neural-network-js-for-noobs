//in the name of the most merciful the all merciful
import {strassen} from "./algorithms/Strassen.mjs";
import { cpy } from "./algorithms/Strassen.mjs";
import { splitMatrix } from "./algorithms/Strassen.mjs";
import karatsuba, {karatsubaGeneralized} from "./algorithms/Karatsuba.mjs";
import {getScientificNotation} from "./algorithms/Karatsuba.mjs";

import { NoInputConstructorMatrix, 
    MatrixAdditionError,
    notMatrix,
    MatrixNotDesired,
    MatrixMultiplyError, 
    MatrixNotSquareError } from "./Errors.mjs";

export class Matrix{

    //create from m,n dimensions 
    constructor(array){
        if (array == undefined){
            NoInputConstructorMatrix.showErr(); 
        }
        else{
            this.matrix = array;
        }
        if ( array.length === array[0].length){
            this.squared = true // algo strassen 
        }
        else{
            this.squared = false;
        }
        this.shape = [array.length, array[0].length];
    }

    T(){
        let tMatrix = Array(this.shape[1])
        for (let i = 0; i < tMatrix.length; i++){
            tMatrix[i] = Array(this.shape[0])
        }

        //transposing is like the inverse ---> shape1 = [1,2] shape1.T = [2,1]
        for (let i = 0; i < this.shape[1]; i++){
            for (let j = 0; j < this.shape[0]; j++){
                tMatrix[i][j] = this.matrix[j][i]
            }
        }

        tMatrix = new Matrix(tMatrix)
        return tMatrix;
    }

    static zeros(M, N){
        let zero = Array(M)
        for (let i = 0; i < zero.length; i++){
            zero[i] = Array(N)
        }

        for (let i = 0; i < zero.length; i++){
            for (let j = 0; j < zero[0].length; j++){
                zero[i][j] = 0
            }
        }

        zero = new Matrix(zero)
        return zero
    }

    static add(a, b){
        
        if (a.shape[0] != b.shape[0] && (a.shape[1] != [b.shape[1]])){
            MatrixAdditionError.showErr(a.shape, b.shape);
        }

        let c = Array(a.shape[0])

        for (var i = 0; i < c.length; i++){
            c[i] = Array(a.shape[1])
        }

        for (let i = 0; i < a.shape[0]; i++){
            for (let j = 0; j < b.shape[1]; j++){
                c[i][j] = a.matrix[i][j] + b.matrix[i][j]
            }
        }

        c = new Matrix(c)
        return c;
    }

    static identity(M, N){
        
        if (M != N){
            MatrixNotDesired.showErr([M, N]);
        }

        let I = Array(M)
        for (let i = 0; i < M; i++){
            I[i] = Array(N)
        }

        for (let i = 0; i < M; i++){
            for (let j = 0; j < N; j++){
                if (i === j){
                    I[i][j] =  1
                }
                else{
                    I[i][j] = 0
                }
            }
        }

        I = new Matrix(I)
        return I
    }

    //split the matrix into 4 pieces
    quadSplit(){
        if (this.shape[0] != this.shape[1]){
            console.log(`The matrix is not squared : ${this.shape}`);
            process.exit(1);
        }
        let m1 = [];
        let m2 = [];
        let m3 = [];
        let m4 = [];
        let n = this.shape[0];
        
        this.matrix.slice(0, n/2).map( (subList) => {
            m1.push(subList.slice(0, n/2));
        });
        this.matrix.slice(0, n/2).map((subList) => {
            m2.push(subList.slice(n/2 , n));
        })
        this.matrix.slice(n/2, n).map( (subList) => {
            m3.push(subList.slice(0, n/2));
        })
        this.matrix.slice(n/2, n).map((subList) => {
            m4.push(subList.slice(n/2 , n));
        })
        m1 = new Matrix(m1);
        m2 = new Matrix(m2);
        m3 = new Matrix(m3);
        m4 = new Matrix(m4);
        return [m1, m2, m3, m4];
    }

    static random(M, N, range){

        //this solution is very cleaver
        let randomMatrix = Array(M)
        for (let i = 0; i < M; i++){
            randomMatrix[i] = Array(N)
        }

        for (var i = 0; i < M; i++){
            for (var j = 0; j < N; j++){
                randomMatrix[i][j] = karatsubaGeneralized(Math.random() * range)
            }
        }

        randomMatrix = new Matrix(randomMatrix)
        return randomMatrix;
    }

    //the dot product is to be done later.....
    static dot(a,b){

        if (a.shape[1] != b.shape[0]){
            // console.error(`s : ${a.shape[1]} != ${b.shape[0]}`)
            MatrixDotError.showErr(a.shape, b.shape);
        }

        if (a.status.squared == true && b.status.squared == true){
            strassen(a,b)
        }

        else{
            let c = Array(a.shape[0])
            for (let i = 0; i < c.length; i++){
                c[i] = Array(b.shape[1])
            }

            let res = Matrix.zeros(a.shape[0], b.shape[1])
            for (var i = 0; i < a.shape[0]; i++){
                for (var j = 0; j < b.shape[1]; j++){
                    for (var k = 0; k < b.shape[0]; k++){
                        res.matrix[i][j] += karatsubaGeneralized(a.matrix[i][k], b.matrix[k][j]);
                    }
                }
            }
        }

        return res;
    }

    coe(a){
        
        for (let i = 0; i < this.shape[0]; i++){
            for (let j = 0; j < this.shape[1]; j++){
                this.matrix[i][j] = karatsubaGeneralized(a, this.matrix[i][j]);
            }
        }

        return this;
    }

    //input should be 2x2 Matrix
    getDet2(){
        // |A| (wich is the det(A))
        if (this.shape[0] != 2 && this.shape[1] !=  2){  
            MatrixNotDesired.showErr(this.shape, 2);
        }
        let result;
        result = karatsubaGeneralized(this.matrix[0][0] * this.matrix[2][2]) - karatsubaGeneralized(this.matrix[1][2] * this.matrix[2][1]);
        return result;

    }

    getDet3(){
        if (this.shape[0] != 3 && this.shape[1] != 3){
            MatrixNotDesired.showErr(this.shape, 3);
        }
        let result;
        result = this.matrix[0][0] * (karatsubaGeneralized(this.matrix[1][1] * this.matrix[2][2]) - karatsubaGeneralized(this.matrix[1][2] * this.matrix));
        return result;
    }

    static minus(a,b){
        
        if (a.shape[0] != b.shape[0]  && a.shape[1] !=  b.shape[1]){
            MatrixAdditionError.showErr(a.shape, b.shape);
        }

        let c = Array(a.shape[0])

        for (var i = 0; i < a.shape[0]; i++){
            c[i] = Array(a.shape[1])
        }

        for (var i = 0; i < a.shape[0]; i++){
            for (var j = 0; j < a.shape[1]; j++){
                c[i][j] = a.matrix[i][j] - b.matrix[i][j]
            }
        }

        c = new Matrix(c)
        return c;
    }


    //uses the gaussian elim
    solve(){

    }


    //returns the positive values of a matrix (like the absolute matrix);
    static absMatrix(A){
        let result;
        
        for (let i = 0; i < A.shape[0]; i++){
            for (let j = 0; j < A.shape[1]; j++){
                A.matrix[i][j] = Math.abs(A.matrix[i][j]);
            }
        }   
        
        result = A;
        return result;
    }

    static multiply(a,b){

        if (a.shape[0] != b.shape[0] && a.shape[1] != b.shape[1]){
            MatrixMultiplyError.showErr(a.shape, b.shape);
        }

        let c = Array(a.shape[0])
        for (var i = 0; i < a.shape[0]; i++){
            c[i] = Array(b.shape[1])
        }

        //algo
        for (let i = 0; i < a.shape[0]; i++){
            for (let j = 0; j < a.shape[1]; j++){
                c[i][j] = karatsubaGeneralized(a.matrix[i][j], b.matrix[i][j]);
            }
        } 

        c = new Matrix(c)
        return c;
    }

    repr(){
        console.log("[");
        // console.log("");
        for (let i = 0; i < this.shape[0]; i++){
            console.log(`    [${this.matrix[i]}]`);
            // console.log("");
        }
        console.log("]");

        // console.log(A.matrix[0])
    }
}

