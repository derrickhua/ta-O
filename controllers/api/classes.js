const Classes = require('../../models/class');

module.exports = {
  index,
  indexUser,
  show,
  create,
  update,
  deleteClass
};

async function index(req, res) {
  let classes = [];
  try {
    classes = await Classes.find({}).sort('name').where('seller').nin([req.user._id]).exec();   
  } catch {
    classes = await Classes.find({}).sort('name').exec(); 
  }

  res.json(classes);
}

async function indexUser(req, res) {
  try {
    const classes = await Classes.find({seller:req.user._id})
    res.json(classes)
  } catch(err) {
    console.log(err)
    res.status(400).json(err)
  }
}


async function show(req, res) {
  const specificClass = await Classes.findById(req.params.id);
  res.json(specificClass);
}

async function create(req, res) {
    try {
        const newClass = await Classes.create(req.body);
        res.json(newClass);
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function update(req, res) {
  try {
      let changedClass = await Classes.findByIdAndUpdate(req.params.id, req.body)
      changedClass.save();
      res.json(changedClass);
  } catch(err) {
      console.log(err)
      res.status(400).json(err)
  }
}

async function deleteClass(req, res) {
  try {
      let deletedClass = await Classes.findByIdAndDelete(req.params.id)
      res.json(deletedClass)
  } catch(err) {
      console.log(err)
      res.status(400).json(err)
  }
}


  