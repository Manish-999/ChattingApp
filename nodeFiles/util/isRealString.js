let isRealString=(str)=>{
    // console.log(typeof str ==='string' , str.trim())
    return typeof str === 'string' && str.trim().length > 0
}
module.exports={isRealString}