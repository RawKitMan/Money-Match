router.get('/', (req, res=>{
    if(loggedIn){
        res.render('index')
    }else{
        res.render('login')
    }
}))