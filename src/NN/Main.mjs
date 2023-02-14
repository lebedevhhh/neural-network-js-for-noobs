//in the name of the most merciful the all merciful
//inspired from the main.py src code
import { Matrix } from "../matrix.mjs"
import { activationFunctions, derivActivationFunctions} from "../Active.mjs";
import csvParser from "csv-parser";
import {fs} from 'fs';


//getting the inputs from the train.csv file
ocd dq




function init_params(){
    var W1 = Matrix.random(10, 784, 1);
    var b1 = Matrix.random(10,1, 1); 
    var W2 = Matrix.random(10,10, 1);
    var b2 = Matrix.random(10,1, 1);

    return [W1, b1, W2, b2];
}
//deconstruction d'object
// let [W1, b1, W2, b2] = init_params();

//notre fonction d'activation sera tt simplement
// activationFunctions.sigmoid();
//meme chose pr la fonction de derivation
// meme chose pr softmax
// activationFunctions.softMax();



