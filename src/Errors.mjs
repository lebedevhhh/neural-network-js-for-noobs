//classes for errors 

export class MatrixDotError{
    //args : matrixes ----> a.shape 
    static showErr(shape1, shape2){
        console.log(`Matrix shapes doesnt match : ${shape1[1]} != ${shape2[0]}`);
        process.exit(1);
    }

}

export class MatrixAdditionError{

    static showErr(shape1, shape2){
        console.log(`Matrix shapes doesnt match : ${shape1} != ${shape2}`);
        process.exit(1);
    }

}

export class activationFunctionNotRecognized{
    static showErr(name){
        console.log(`Name of the function is not recognized : ${name}`);
        process.exit(1);
    }
}

//extends the static methods
export class MatrixMultiplyError extends MatrixAdditionError{}

export class MatrixNotSquareError{

    static showErr(shapeOfMatrix){
        console.log(`Matrix is not a square matrix : ${shapeOfMatrix[0]} != ${shapeOfMatrix[1]}`);
        process.exit(1);
    }

}

export class MatrixNotDesired{
    static showErr(shapeOfMatrix, val1){
        console.log(`Matrix is not of the desired shape: (${shapeOfMatrix[0]}, ${shapeOfMatrix[1]}) != (${val1}, ${val1})`);
        process.exit(1);
    }
}

export class notMatrix{
    static showErr(args){
        console.log(`The argument : ${args} is not a matrix [TYPE] ${typeof(args)}`);
        process.exit(1);
    }
}


export class LossFunctionUndefined{
    static showErr(args){
        console.log(`undefined loss function : ${args}`)
        process.exit(1);
    }
}


export class FF{ // FIlLE FAILED

    static showErr(err){
        console.log(err);
        process.exit(1);
    }
}

export class NoInputConstructorMatrix{
    static showErr(){
        console.log("there's no input in the class Matrix constructor"); 
        process.exit(1);
    }
}

