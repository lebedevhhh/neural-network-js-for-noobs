//in the name of the most merciful the all merciful
//some utility function 
import XMLWriter from "xml-writer";

export function getExt(filename){
    let ext;

    for (let string of filename){
        if (string === "."){
            let idx = filename.indexOf(string) + 1;
            ext = filename.substring(idx);
        }

        continue;
    }

    return ext;
}






