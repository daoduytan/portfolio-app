const Experience = require('../models/experience');

exports.getExperience = (req, res) => {
  Experience.find({})
    .sort({ startDate: 1 })
    .exec((err, allExperience) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(allExperience);
    });
};

exports.getExperienceById = (req, res) => {
  const experienceId = req.params.id;

  Experience.findById(experienceId)
    .select('-__v')
    .exec((err, foundExperience) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(foundExperience);
    });
};

exports.postExperience = (req, res) => {
  const experienceData = req.body;
  const userId = req.user && req.user.sub;
  const experience = new Experience(experienceData);
  experience.userId = userId;

  experience.save((err, createdExperience) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(createdExperience);
  });
};

exports.updateExperience = (req, res) => {
  const experienceId = req.params.id;
  const experienceData = req.body;

  Experience.findById(experienceId, (err, foundExperience) => {
    if (err) {
      return res.status(422).send(err);
    }

    foundExperience.set(experienceData);
    foundExperience.save((err, savedExperience) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(savedExperience);
    });
  });
};

exports.deleteExperience = (req, res) => {
  const experienceId = req.params.id;

  Experience.deleteOne({ _id: experienceId }, (err, deletedExperience) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json({ status: 'DELETED' });
  });
};
