function retornaApenasPares(arr){
    let pares=[];
    for( i=0;i<arr.length;i++){
        if(arr[i]%2==0){
            pares.push(arr[i]);
        }
    }
    return pares;
}
let numeros=[2,3,4,5,6,7,8,22,30,31];
let numerosPares=retornaApenasPares(numeros);
console.log(numerosPares);