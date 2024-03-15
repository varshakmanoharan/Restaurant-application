const testController = ()=>{
    try {
        res.status(200).send({
         success: true,
         message: 'test user data'
        })
    } catch (error) {
        console.log('error');
    }
}

module.exports ={testController}