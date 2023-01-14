//in the name of the most merciful the all merciful
import {Matrix} from "../matrix.mjs";
//source code : https://gist.github.com/syphh/0df7faf18a0412346dacefe8a213da4b
export default function karatsuba(x, y){
    if (x < 10 && y < 10) return x * y;

    else{
        let n = Math.max(String(x).length, String(y).length);
        let half = Math.floor(n / 2);
        let a = Math.floor(x / (Math.pow(10, half)));
        let b = x % (Math.pow(10, half));
        let c = Math.floor(y / Math.pow(10, half));
        let d = y % Math.pow(10, half);
        let ac = karatsuba(a,c);
        let bd = karatsuba(b,d);
        let ad_plus_bc = karatsuba(a+b, c+d)-ac-bd;
        let result = ac * (10 ** (2 * half)) + (ad_plus_bc * (10 ** half)) + bd;
        return result;
    }
};

//is there a way of doing this with decimal numbers??/
//karatsuba generalized (works with decimals, we need)
export function getScientificNotation(number){
    if (Number.isInteger(number)){
        return karatsuba(number)
    }
    
    else{
        let n = 0;
        while (!Number.isInteger(number)){
            number *= 10; //this might be slower
            n--;
        }
        let remaining = number;
        //returning a list with the number and the exponent
        let list = [remaining, n];
        // console.log(`${remaining} * 10 ** ${n}`);
        return list;
    }

};

export function karatsubaGeneralized(x, y){
    x = getScientificNotation(x);
    y = getScientificNotation(y);
    let product = karatsuba(x[0], y[0]);
    let exponent = x[1] + y[1];
    let result = product * (10 ** exponent);
    return result;
};

