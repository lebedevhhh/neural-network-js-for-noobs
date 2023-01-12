import { activationFunctions } from "./Active.mjs";
import { Matrix } from "./matrix.mjs";
import { MatrixDotError, FF, MatrixAdditionError, MatrixMultiplyError, MatrixNotDesired, MatrixNotSquareError, LossFunctionUndefined ,activationFunctionNotRecognized} from "./Errors.mjs";
import fs from 'fs';
import { LossFunctions } from "./Loss.mjs";
import { stringify } from 'csv-stringify';//F
import XMLWriter from "xml-writer"; //F
import yaml from "js-yaml"; //Fait
import convert from "xml-js"; //FAIT 
// import csv from "csvtojson";
import { getExt } from "./utils.mjs";

//READ THE DOCS ----> https://www.npmjs.com/package/xml-writer
//read the DOCS ----> https://www.npmjs.com/package/js-yaml
//read the DOCS ----> https://csv.js.org/
// read the DOCS ----> https://www.npmjs.com/package/dom-parser || EXAMPLE ----> https://www.w3schools.com/xml/tryit.asp?filename=try_dom_loadxmltext

//DEFINING vars
var xmlParser = new DOMParser();    


export class NeuralNet{

    //ARGS : deep, how much neural u want
    //size : size of your input matrix  (should be an array)?
    constructor(jsonObj){ 
        //we can store or 
        this.neural = {};
        this.size = jsonObj.size; //size of the input matrixes 
        this.name = jsonObj.name;
        this.deep = jsonObj.Layers;

        //defining the first two (those are matrix object, so u  can access it with propreties)
        this.neural['W1'] = Matrix.random(this.size[1], this.size[0], 1);
        this.neural["B1"] = Matrix.random(this.size[0], this.size[0], 1);
        this.neural["W2"] = Matrix.random(this.size[1], this.size[1], 1);
        this.neural["B2"] = Matrix.random(this.size[1], this.size[1], 1);
        for (let i = 0; i < this.deep - 2; i++){
            this.neural[`W${i}`] = Matrix.random(this.size[1], this.size[1], 1);
            this.neural[`B${i}`] = Matrix.random(this.size[0], this.size[0], 1);
        }

        if (jsonObj.activation) this.activation = jsonObj.activation;
        else this.activation = null;

        if (jsonObj.lossFunction) this.loss = jsonObj.lossFunction;
        else this.loss = null;
    }

    setActivationFunction(nameFuncActivation){
        //une espece de mapping
        this.activation = nameFuncActivation; //the user should choose between those 
        // in the class activationFunctions 
    }

    //TODO GET RESULT
    getResult(input, trueValue){
        let resultJSON = {};

        for (let key of Object.keys(this.neural)){
            if (key.charAt(0) == "W"){
                // console.log(this.neural[key])
                input = Matrix.dot(input, this.neural[key]);
                // console.log(input);
            }
            else{
                input = Matrix.add(input, this.neural[key]);
                // console.log(input);
            }
        }

        //when we finish the process of "forward props"
        switch (this.activation){
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
                resultJSON["loss"] = LossFunctions.linearLoss(input, trueValue);
                // resultJSON["output"] = input;
                break;

            case "squaredLoss":
                resultJSON["loss"] = LossFunctions.squaredLoss(input, trueValue);
                break;
            
            default:
                LossFunctionUndefined.showErr(this.loss);
        }

        resultJSON["output"] = input;

        return resultJSON;
    }

    //gradient-descent (NEED MORE INFO)
    // backPropagation(){

    // }

    //IMPLEMENT FUNCTION SAVE INTO FILE,  but not exctract, we will let the user do it 
    saveFile(filename, path){

        switch(getExt(filename)){
            case "json":
                fs.writeFile(path + filename, JSON.stringify(this), (err) => {
                    if (err){
                        // console.error("[FAILED CREATING FILE]: " + err);
                        // process.exit(1);
                    }
                })   
            
            case "xml":
                xw  = new XMLWriter();
                xw.startDocument();
                xw.startElement("NeuralNetwork");
                xw.writeAttribute("name", this.name);
                for (let i = 0; i < (Object.keys(this.neural).length / 2); i++){
                    xw.writeElement(`W{i}`, this.neural[`W{i}`]);
                    xw.writeElement(`B{i}`, this.neural[`B{i}`]);
                }
                xw.writeElement("Activation function", this.activation);
                xw.writeElement("Loss function", this.loss);
                fs.writeFile(path + filename, xw.toString()), (err) => {
                    if (err){
                        // console.log("[]")
                    }
                };

        }
    }

    setLossFunction(nameLoss){
        this.loss = nameLoss;
    }

    static copy(jsonObj){ //json object should meet the requirement of the class constructor
        model = new NeuralNet(jsonObj);
        return model;
    }

}

