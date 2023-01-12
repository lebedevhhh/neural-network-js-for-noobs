//in the name of the most merciful the all merciful

//required for integers only
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
}
