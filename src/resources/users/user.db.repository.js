const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const create = async user => {
  return User.create(user);
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const update = async newUserProps => {
  const res = await User.updateOne({ _id: newUserProps.id }, newUserProps);

  if (res.nModified === 0) {
    return null;
  }

  return getById(newUserProps.id);
};

const deleteUser = async id => {
  const res = await User.deleteOne({ _id: id });

  return res.deletedCount;
};

const findByLogin = async login => {
  return User.findOne({ login });
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteUser,
  findByLogin
};
