const { localstat } = require('../database');
//const { wrapWithErrorHandler } = require('../util');

async function getAll(req, res) {
 

  const result = await localstat.findAll();
 
  res.status(200).json({ result });
}

async function insertOrUpdate(req, res) {
  const { key, value } = req.body;
  if (!key || !value) {
    res.status(400).json({ error: 'key and value are required' });
    return;
  }

  await localstat.upsert({ key, value });

  res.status(200).json({ result: 'success' });
}

async function remove(req, res) {
  const { key } = req.params;
  if (!key) {
    res.status(400).json({ error: 'key is required' });
    return;
  }

  await localstat.destroy({
    where: { key },
  });

  res.status(200).json({ result: 'success' });
}

module.exports = {
  getAll,
  insertOrUpdate,
  remove,
};
