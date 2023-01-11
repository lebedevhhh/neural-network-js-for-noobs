import { activationFunctions } from "./Active.mjs";
import { Matrix } from "./matrix.mjs";
import { MatrixDotError, MatrixAdditionError, MatrixMultiplyError, MatrixNotDesired, MatrixNotSquareError} from "./matrix.mjs";
import fs from 'fs';
import { stringify } from 'csv-stringify';
import getExt from "./utils.js";
import XMLWriter from "xml-writer";
import yaml from "js-yaml";
import convert from "xml-js";
import csv from "csvtojson";
// import xmlParser 
import DOMParser from "dom-parser";

//READ THE DOCS ----> https://www.npmjs.com/package/xml-writer
//read the DOCS ----> https://www.npmjs.com/package/js-yaml
//read the DOCS ----> https://csv.js.org/
// read the DOCS ----> https://www.npmjs.com/package/dom-parser || EXAMPLE ----> https://www.w3schools.com/xml/tryit.asp?filename=try_dom_loadxmltext

//DEFINING vars
var xmlParser = new DOMParser();
// const activationFunctionsMapping = new Map();
// activationFunctionsMapping.set()


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
        else this.activation = null;
    }

    setActivationFunction(nameFuncActivation){
        //une espece de mapping
        this.function = nameFuncActivation; //the user should choose between those 
        // in the class activationFunctions 
    }

    //TODO GET RESULT
    getResult(input){
        let result;

        for (let key of Object.keys(this.neural)){
            if (key.charAt(0) == "W"){
                input = Matrix.dot(input, this.neural[key]);
            }
            else{
                input = Matrix.add(input, this.neural[key]);
            }
        }

        //when we finish the process of "forward props"
        input = this.function

        return result;
    }


    setLossFunction(func){
        this.loss = func;
    }

    static copy(jsonObj){ //json object should meet the requirement of the class constructor
        model = new NeuralNet(jsonObj);
        return model;
    }

}

