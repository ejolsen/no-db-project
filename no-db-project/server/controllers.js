let weatherLOG = [];
let id = 0


module.exports = {
  create: ( req, res ) => {
  },

  read: ( req, res ) => {
    res.status(200).send( messages );
  },

  update: ( req, res ) => {
    const { date_time, temp, skyCond } = req.params
    weatherLOG.push({date_time, temp, skyCond, id});
    id++;
    res.status(200).send(weatherLOG);
  },

  delete: ( req, res ) => {
    const deleteID = req.params.id;
    deleteLOG = weatherLOG.findIndex( message => weatherLOG.id == deleteID );
    weatherLOG.splice(deleteLOG, 1);
    res.status(200).send(weatherLOG);
  }
};