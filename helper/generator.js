function generate() {
    let MOD = 1_000_000_007;
    let p = 23, h = 17, value = 0;
    let nums = [a1, a2, a3, a4] =
    [(Math.random()*8)+1, (Math.random()*8)+1, (Math.random()*8)+1, (Math.random()*8)+1];
    for(let i = 0; i < nums.length; i++)
        value += (Math.pow(p+nums[i], h) % MOD);
    return value;
}

function fourDigitGenerate() {
    return Math.round((Math.random()*9000)+1000);
}

module.exports = {generate, fourDigitGenerate}
