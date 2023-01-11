//in the name of the most merciful the all merciful;

export default class LossFunctions{

    //TODO implement the LOG LOSS
    static linearLoss(prediction, trueValues){
        let result;
        if (prediction.constructor.name != "Matrix"){
            notMatrix.showErr(prediction);
        }
        
        result = Matrix.absMatrix(Matrix.minus(trueValues, prediction));
        return result;
    }

    static squaredLoss(prediction, trueValues){ //the true values shall be a matrix class
        let result;
        
        if (prediction.constructor.name != "Matrix"){ 
            return new notMatrix(prediction).showErr(); 
        }

        result = Matrix.minus(trueValues, prediction)
        for (let i = 0; i < result.shape[0]; i++){
            for (let j = 0; j < result.shape[1]; j++){
                result.matrix[i][j] = Math.pow(result.matrix[i][j], 2);
            }
        }
        return result; //this is the LOSS
    }
}




