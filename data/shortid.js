export const generateshortUid=()=>{
    const alphabet='abcdefghijklmnopqrstuvwxyz0123456789ABCDEFHIJKLMNOPQRSTUVWXYZ';
    const alph_length=Number(alphabet.length)
    const timestamp=Date.now()
    const random=Math.floor(Math.random()*10000)
    const  combined_rand= timestamp + random
    let shortUid=''
    let num=combined_rand

    while(num >0){
        shortUid+=alphabet[num%alph_length]
        num=Math.floor(num/alph_length)
    }
   let random_char="";
   for(let i=0;i<8;i++){
     random_char +=alphabet[Math.floor(Math.random()*alph_length)];
   }
    return random_char +shortUid.slice(0,8)
}

