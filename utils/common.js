exports.genereateKey = (count) => {
    let string = '';
    for(let i=0; i<count; i++) {
        string = string + Math.floor((Math.random() * 10));
    }
    return string;
} 