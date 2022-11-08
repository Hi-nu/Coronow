const { stats } = require('../database');
//const { wrapWithErrorHandler } = require('../util');

async function getAll(req, res) {
  const result = await stats.findAll();
  res.status(200).json({ result });
  
}

async function insertOrUpdate(req, res) {
  const { date } = req.body;
 
  const count = await stats.count({ where: { date } });

  if (count === 0) {
    await stats.create(req.body);
  } else {
    await stats.update(req.body, { where: { date } });
  }
  res.status(200).json({ result: 'success' });
}

async function remove() {
}

module.exports = {
  getAll,
  insertOrUpdate,
  remove,
};