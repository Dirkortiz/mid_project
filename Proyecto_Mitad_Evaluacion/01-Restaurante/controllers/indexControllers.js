class IndexControllers {
   viewHome = (req, res) =>{
      res.render('index', { title: 'Express' });
  }

}




module.exports = new IndexControllers;