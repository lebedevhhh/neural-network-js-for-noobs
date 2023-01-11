import { activationFunctions } from "./Active.mjs";
import { Matrix } from "./matrix.mjs";
import { MatrixDotError, MatrixAdditionError, MatrixMultiplyError, MatrixNotDesired, MatrixNotSquareError, activationFunctionNotRecognized} from "./Errors.mjs";
import fs from 'fs';
import { LossFunctions } from "./Loss.mjs";
import { stringify } from 'csv-stringify';
import XMLWriter from "xml-writer";
import yaml from "js-yaml";
import convert from "xml-js";
import csv from "csvtojson";
import { getExt } from "./utils.mjs";
// import xmlParser 
import DOMParser from "dom-parser";

//READ THE DOCS ----> https://www.npmjs.com/package/xml-writer
//read the DOCS ----> https://www.npmjs.com/package/js-yaml
//read the DOCS ----> https://csv.js.org/
// read the DOCS ----> https://www.npmjs.com/package/dom-parser || EXAMPLE ----> https://www.w3schools.com/xml/tryit.asp?filename=try_dom_loadxmltext

//DEFINING vars
var xmlParser = new DOMParser();    


class NeuralNet{

    //ARGS : deep, how much neural u want
    //size : size of your input matrix  (should be an array)
    constructor(jsonObj){ 
        //we can store or 
        this.neural = {};
        this.size = jsonObj.size; //size of the input matrixes 
        this.name = jsonObj.name;

        //defining the first two (those are matrix object, so u  can access it with propreties)
        this.neural['W1'] = Matrix.random(this.size[1], this.size[0], 1);
        this.neural["B1"] = Matrix.random(this.size[0], this.size[0], 1);
        this.neural["W2"] = Matrix.random(this.size[1], this.size[1], 1);
        this.neural["B2"] = Matrix.random(this.size[1], this.size[1], 1);
        for (let i = 0; i < deep - 2; i++){
            this.neural[`W${i}`] = Matrix.random(this.size[1], this.size[1], 1);
            this.neural[`B${i}`] = Matrix.random(this.size[0], this.size[0], 1);
        }

        if (jsonObj.activation) this.activation = jsonObj.name;
        else this.activation = null;

        if (jsonObj.lossFunction) this.loss = jsonObj.loss;
        else this.loss = null;
    }

    setLossFunction(nameFuncActivation){
        this.loss = nameFuncActivation
    }

    setActivationFunction(nameFuncActivation){
        //une espece de mapping
        this.function = nameFuncActivation; //the user should choose between those 
        // in the class activationFunctions 
    }

    //TODO GET RESULT
    getResult(input, trueValue){
        // let result = []; // shall contain the result and the loss
        // let resultMap = new Map();
        let resultJSON = {};

        for (let key of Object.keys(this.neural)){
            if (key.charAt(0) == "W"){
                input = Matrix.dot(input, this.neural[key]);
            }
            else{
                input = Matrix.add(input, this.neural[key]);
            }
        }

        //when we finish the process of "forward props"
        switch (this.function){
            case "sigmoid":
                input = activationFunctions.sigmoid(input);
                break;
                
            case "GELU":
                input = activationFunctions.GELU(input);
                break;
            
            case "Softplus":
                input = activationFunctions.Softplus(input);
                break;
            
            case "ELU":
                input = activationFunctions.ELU(input);
                break;
            
            case "SiLU":
                input = activationFunctions.SiLU(input);
                break;

            case "Gaussian":
                input = activationFunctions.Gaussian(input);
                break;
            
            case "tanh":
                input = activationFunctions.tanh(input);
                break;
            
            case "arctan":
                input = activationFunctions.arctan(input);
                break;
            
            case "sgn":
                input = activationFunctions.sgn(input);
                break;

            case "ReLU":
                input = activationFunctions.ReLu(input);
                break;

            default:
                activationFunctionNotRecognized.showErr(this.function);
        }

        switch (this.loss){
            case "linearLoss":
                resultJSON["loss"] = LossFunction.linearLoss(input, trueValue);
                // resultJSON["output"] = input;
                break;

            case "squaredLoss":
                resultJSON["loss"] = LossFunction.squaredLoss(input, trueValue);
                break;
        }

        resultJSON["output"] = input;

        return resultJSON;
    }


    setLossFunction(func){
        this.loss = func;
    }

    static copy(jsonObj){ //json object should meet the requirement of the class constructor
        model = new NeuralNet(jsonObj);
        return model;
    }

}

