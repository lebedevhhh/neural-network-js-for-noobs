//classes for errors 

export class MatrixDotError{
    //args : matrixes ----> a.shape 
    static showErr(shape1, shape2){
        console.error(`Matrix shapes doesnt match : ${shape1[1]} != ${shape2[0]}`);
        process.exit(1);
    }

}

export class MatrixAdditionError{

    static showErr(shape1, shape2){
        console.error(`Matrix shapes doesnt match : ${shape1} != ${shape2}`);
        process.exit(1);
    }

}

export class activationFunctionNotRecognized{
    static showErr(name){
        console.error(`Name of the function is not recognized : ${name}`);
        process.exit(1);
    }
}

//extends the static methods
export class MatrixMultiplyError extends MatrixAdditionError{}

export class MatrixNotSquareError{

    static showErr(shapeOfMatrix){
        console.error(`Matrix is not a square matrix : ${shapeOfMatrix[0]} != ${shapeOfMatrix[1]}`);
        process.exit(1);
    }

}

export class MatrixNotDesired{
    static showErr(shapeOfMatrix){
        console.error(`Matrix is not of the desired shape: (${shapeOfMatrix[0]}, ${shapeOfMatrix[1]}) != (2,2)`);
        process.exit(1);
    }
}

export class notMatrix{
    static showErr(args){
        console.error(`The argument : ${args} is not a matrix [TYPE] ${typeof(args)}`);
        process.exit(1);
    }
}


export class LossFunctionUndefined{
    static showErr(args){
        console.error(`undefined loss function : ${args}`)
        process.exit(1);
    }
}


export class FF{ // FIlLE FAILED

    static showErr(err){
        console.error(err);
        process.exit(1);
    }
}