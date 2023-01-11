//in the name of the most merciful and the all merciful;

//TESTS
// import XMLWriter from "xml-writer";
import fs from 'fs';
// import { stringify } from 'csv-stringify';
// import yaml, { JSON_SCHEMA } from "js-yaml";
import { activationFunctions } from "./Active.mjs";
import { Matrix } from './matrix.mjs';
// const src = {
//     test: "Hello",
// };
// console.log(yaml.dump(src)); //returns a YAML string

// const xw = new XMLWriter();
// xw.startDocument();
// xw.startElement('root'); //the class (tag == args)
// xw.writeElement('tag', 'test'); // content in the class (name == tag, content === test)
// console.log(xw.toString());
// const xw = new XMLWriter();
// xw.startDocument();
// xw.startElement("Neural network");
// xw.writeAttribute("name", "nameNN");
// xw.startElement("layer1");
// xw.writeElement("b1", "4874384");
// xw.startElement("b3");
// // xw.writeElement("layer2", "b2");
// console.log(xw.toString());
// const t = {
//     "test": "lol",
// }
//GET THE LENGHT OF THE JSON OBJECT
// console.log(Object.keys(t).length);
// let obj = {
//     "name": "Jello",
//     "y": {
//         "test": "Hello",
//     }
// }
// generate({length: 10}).pipe(process.stdout); // random csv "title"
// stringify([
//     [ '1', '2', '3', '4' ],
//     [ 'a', 'b', 'c', 'd' ]
//   ], function(err, output){ //call back function
//     if (err){js
//         console.error(err);
//     }

//     console.log(output);
//     // console.error(err);
// });
// W1 ---> value
//B1 ---> VALUE ....,ect
// stringify([{
//     "test" : "value1",
//     "test1": "value2"
// }], function(err, csv){
//     if (!err) console.log(csv);
//     else console.error(err);
// })
//on pourrait creer une cvontenant tous les indexes ;
//une liste contenant tts les items, puis appeler la fonction stringify;
// const t =  {
//     t: "143298",
//     t1: "534879"
// }
// //GET ALL THE ITEMS FROM OBJECT
// console.log(Object.values(t));

// let t = []
// // t.push(1).push(190);
// t.push(1);
// t.push(1);
// console.log(t);
// let options = {
//     encoding: "utf-8" //precise the encoding when using a fs.readFile 
// };
// fs.readFile("test.yaml", options = options, function( err, txt){
//     if (!err){
//         let t = yaml.load(txt, options={schema: JSON_SCHEMA});
//         console.log(t);
//     }
//     else{
//         console.error(err);
//     }
// })

// let listKeys = Object.keys(model.neural).push("activation");
// listKeys.push("loss");
// let listItems = Object.values(model.neural).push(`${model.activation}`);
// listItems.push(`${model.lossFunction}`);  

// stringify(listKeys, listItems, function(err, string){
//     if (!err){  
//         fs.writeFile(path + filename, string, err => {
//             console.error(err);
//             process.exit(1);
//         });
//     }
//     else console.error(err);
// });

// fs.close();
// break;
// break;

//GET THE NAME OF A CLASS 
// let t = new Matrix([
//     [1,23,4],
//     [5,6,7],
//     [6,5,7]
// ])
// console.log(activationFunctions)

//GET THE FIRST CHAR OF A STRING 
let t = "tests"
console.log(t.charAt(0));