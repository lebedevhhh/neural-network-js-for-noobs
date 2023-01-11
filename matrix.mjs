//in the name of the most merciful the all merciful

export class Matrix{

    //create from m,n dimensions 
    constructor(array){
        this.matrix = array
        this.shape = [array.length, array[0].length]
        this.size = array.length * array[0].length 
    }

    //transposing the matrix
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

    static random(M, N, range){

        //this solution is very cleaver
        let randomMatrix = Array(M)
        for (let i = 0; i < M; i++){
            randomMatrix[i] = Array(N)
        }

        for (var i = 0; i < M; i++){
            for (var j = 0; j < N; j++){
                randomMatrix[i][j] = Math.floor(Math.random() * range)
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

        let c = Array(a.shape[0])
        for (let i = 0; i < c.length; i++){
            c[i] = Array(b.shape[1])
        }

        let res = Matrix.zeros(a.shape[0], b.shape[1])
        for (var i = 0; i < a.shape[0]; i++){
            for (var j = 0; j < b.shape[1]; j++){
                for (var k = 0; k < b.shape[0]; k++){
                    res.matrix[i][j] += a.matrix[i][k] * b.matrix[k][j]
                }
            }
        }

        return res;
    }

    coe(a){
        
        for (let i = 0; i < this.shape[0]; i++){
            for (let j = 0; j < this.shape[1]; j++){
                this.matrix[i][j] = a * this.matrix[i][j]
            }
        }

        return this
    }

    //input should be 2x2 Matrix
    getDet(){
        // |A| (wich is the det(A))
        if (this.shape != [2,2]){  
            MatrixNotSquareError.showErr(this.shape);
        }
        let result;
        result = (this.matrix[0][0] * this.matrix[2][2]) - (this.matrix[1][2] * this.matrix[2][1]);
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
                c[i][j] = a.matrix[i][j] * b.matrix[i][j]
            }
        } 

        c = new Matrix(c)
        return c;
    }

    repr(){
        //this way is cleaner
        console.log("[")
        for (let x of this.matrix){
            console.log(" [" + x + "] ");
        }
        console.log("]");
    }

}

