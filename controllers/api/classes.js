const Classes = require('../../models/class');
const aws = require('aws-sdk')
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const fs = require('fs')
const path = require("path");
aws.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY})
const s3Bucket = new aws.S3({ params: { Bucket: process.env.AWS_BUCKET}})
const BASE_URL = `https://${process.env.AWS_BUCKET}.s3.ca-central-1.amazonaws.com`


module.exports = {
  index,
  indexUser,
  indexBought,
  show,
  create,
  update,
  deleteClass,
  uploadPhoto,
  uploadFileOnS3,
  deleteUploads
};

async function index(req, res) {
  let classes = [];
  try {
    classes = await Classes.find({ isPaid: { $ne: true  }, seller: { $ne: [req.user._id]}}).sort('name').exec();
  } catch {
    classes = await Classes.find({isPaid: { $ne: true  }}).sort('name').exec(); 
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

async function indexBought(req, res) {
  try {
    const classes = await Classes.find({buyer:req.user._id})
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
        req.body.seller = req.user._id
        req.body.username = req.user.name
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

async function uploadPhoto(req, res) {
  try {
      let imageURL = `${BASE_URL}/${req.file.filename}.jpeg`
      uploadFileOnS3(`${req.file.filename}.jpeg`, fs.readFileSync(req.file.path), res, imageURL)
    } catch (err) {
      res.status(400).json(err)
  }
}

function uploadFileOnS3(fileName, fileData, resp, imageURL) {
  var params = {
    Key: fileName,
    Body: fileData,
  };
  s3Bucket.upload(params, function (err, res) {
    if (err) {
      console.log("Error in uploading file on s3 due to " + err);
    } else {
      console.log(`${fileName} successfully uploaded on Amazon S3`)
      deleteUploads()
      resp.status(200).json(imageURL)
    }
  });
}

function deleteUploads() {
  const directory = "uploads/";
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}


  