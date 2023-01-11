//in the name of the most merciful, the all merciful

//those are the activation functions 
//DOCS ----> https://en.wikipedia.org/wiki/Activation_function


export class activationFunctions{

    //only static methods
    static sigmoid(A){
        //A : matrix ou un nombre entier
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = 1/(1 + Math.pow(Math.E, -(A.matrix[i][j])))
                }
            }
            result = A
            return result
        }
    
        //cas nombre entier
        else{
            result = 1/(1 + Math.pow(Math.E, -A))
                return result
        }
    } 

    //approximation
    static GELU(A){

        let result;

        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = 0.5 * A.matrix[i][j] * (1 + Math.tanh(Math.sqrt(2*Math.PI) * (A.matrix[i][j] + 0.044715 * Math.pow(A.matrix[i][j], 3))));
                }
            }
            result = A;
            return result;
        }
        else{
            result = 0.5 * A * (1+Math.tanh(Math.sqrt(2 * Math.PI) * (A + 0.004715 * Math.pow(A, 3))));
            return result;
        }

    }


    static Softplus(A){

        let result;
        
        if (typeof(A) == "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = Math.log( 1 + Math.pow(A.matrix[i][j], Math.E));
                }
            }
            result = A;
            return result;
        }
        
        result = Math.log(1+ Math.pow(A, Math.E));
        return result;
    }

    static ELU(A, params){

        let result;

        if (typeof(A) != "number" ){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    if (A.matrix[i][j] > 0){
                        A.matrix[i][j] = A.matrix[i][j];
                    }
                    else{
                        A.matrix[i][j] = params * (Math.pow(Math.E, A.matrix[i][j]) - 1);
                    }
                }
            }
            result = A;
            return result;
        }

        else {
            if (A > 0){
                result = A;    
                return results;
            }
            else{
                result = params * (Math.pow(Math.E, A) - 1);
                return result;
            }
        }

    }

    static SiLU(A){
        let result;
        
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = A.matrix[i][j]/ (1+ Math.pow(Math.E, -1 * A.matrix[i][j]));
                }
            }
            result = A;
            return result;
        }
        
        result = A/ (1+ Math.pow(Math.E, -1 * A));
        return result;
    }

    static Gaussian(A){

        let result;
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = Math.pow(Math.E, -1 * Math.pow(A.matrix[i][j], 2));
                }
            }
            result = A;
            return result;
        }

        result = Math.pow(Math.E, -1 * Math.pow(A, 2));
        return result;
    }

    static tanh(A){
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = Math.tanh(A.matrix[i][j]);
                }
            }
            result = A
            return result
        }
    
        //cas nombre entier
        else{
            result = Math.tanh(A);
            return result
        }
    }

    static arctan(A){
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = A.matrix[i][j]/(1 + 0.28086 * Math.pow(2, A.matrix[i][j])) //division and multiplication
                }
            }
            result = A
            return result
        }
    
        //cas nombre entier
        else{
            result = A / (1 + 0.28086 * Math.pow(2, A))
            return result
        }
    }

    static sgn(A){
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = A.matrix[i][j] / ( 1 + Math.abs(A.matrix[i][j]) )
                }
            }
            result = A
            return result
        }
    
        //cas nombre entier
        else{
            result = A / (1+ Math.abs())
            return result
        }
    }

    //if 0 ---> 0 else f(x) = x
    static ReLu(A){
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    if (A.matrix[i][j] <= 0){
                        A.matrix[i][j] = 0;
                    }
                    else{
                        A.matrix[i][j] = A.matrix[i][j];     
                    }
                }
            }
            result = A;
            return result;
        }
    
        //cas nombre entier
        else{
            if (A <= 0){
                result = 0;
                return result;
            }
            else{
                result = A;
                 return A;
            }
        }    
    }
}

//shall we make a derive?
//YES
export default class derivActivationFunctions{
    static derivSigmoid(A){
        //A : matrix ou un nombre entier
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = Math.pow(Math.E, -A.matrix[i][j])/Math.pow(1+Math.pow(Math.E, -A.matrix[i][j]),2);
                }
            }
            result = A
            return result
        }
    
        //cas nombre entier
        else{
            result = Math.pow(Math.E, -A)/Math.pow(1+Math.pow(Math.E, -A), 2);
            return result;
        }
    }

    static derivTanh(A){
        //A : matrix ou un nombre entier
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    //TDOO
                    // result = 1 - Math.pow( Math.pow(Math.E,) ,2);
                }
            }
            result = A
            return result
        }
    
        //cas nombre entier
        else{
            //toDO
            // result = 1 - Math.pow( ,2);
            return result
        }
    }

    static derivReLu(){
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    if (A.matrix[i][j] < 0) A.matrix[i][j] = 0; 
                    else A.matrix[i][j] = 1;
                }
            }
            result = A;
            return result;
        }
    
        //cas nombre entier
        else{
            if (A < 0) result = 0;
            else result = 1;
            return result;
        }
    }

    static derivSoftplus(A){
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    A.matrix[i][j] = 1/(1+ Math.pow(Math.E, -A.matrix[i][j]));
                }
            }
            result = A;
            return result;
        }
    
        //cas nombre entier
        else{
            result = 1/(1+ Math.pow(Math.E, -A));
            return result;
        }
    }


    static derivELU(A, params){
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    if (A.matrix[i][j] < 0) A.matrix[i][j] = params * Math.pow(Math.E, A.matrix[i][j]);
                    else A.matrix[i][j] = 1
                }
            }
            result = A;
            return result;
        }
    
        //cas nombre entier
        else{
            if (A < 0) result = params * A;
            else result = 1;
            return result;
        }
    }

    //static SiLU TODO


    //TODO
    static derivGELU(A){
        let result;

        //cas matrix
        if (typeof(A) != "number"){
            for (let i = 0; i < A.shape[0]; i++){
                for (let j = 0; j < A.shape[1]; j++){
                    //TDOO
                    // result = 1 - Math.pow( Math.pow(Math.E,) ,2);
                }
            }
            result = A
            return result
        }
    
        //cas nombre entier
        else{
            //toDO
            // result = 1 - Math.pow( ,2);
            return result
        }
    }

}