const Tutorial = require("../model/tutorial.model");

// exports.getall = (req, res) => {
//   let pageNo = parseInt(req.query.pageNo);
//   let size = parseInt(req.query.size);
//   Tutorial.find()
//     .skip(size * (pageNo - 1))
//     .limit(size)
//     .exec()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json({ result });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "Error" });
    // });
// };

exports.getall = (req, res) => {
  let pageNo = parseInt(req.query.pageNo);
  let size = parseInt(req.query.size);
  Tutorial.find()
    .skip(size * pageNo)
    .limit(size)
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error" });
    });
};

exports.getByID = (req, res) => {
  Tutorial.findById(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "something get wrong!" });
    });
};

exports.create = (req, res) => {
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
  });

  tutorial
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({ result, msg: "Success Submitted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error" });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Tutorial.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((result) => {
      console.log(result);
      res.status(200).json({ result, msg: "Successfully submitted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error" });
    });
};

exports.remove = (req, res) => {
  Tutorial.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(200).json({ msg: "successfully deleted!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error while deleting" });
    });
};

exports.removeAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((result) => {
      console.log("Deleted Documents No.: ", result.deletedCount);
      res.status(200).json({ msg: "Successfully deleted all documents" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error" });
    });
};

exports.byTitle = (req, res) => {
  const title = req.query.title;
  Tutorial.find({ title: title })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};
