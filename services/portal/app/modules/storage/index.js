var path = require('path');
var fs = require('fs');


class Storage {
  constructor(config) {
    try {
      if(!config || config.STORAGE_PATH === undefined) {
        throw Error("Unable to find storage path");
      } else {
        this.STORAGE_PATH = path.join(__dirname, config.STORAGE_PATH);
      }
    } catch(e) {
      console.log(e);
    }
  }

  storeb64(name, b64i) {
    var base64Data = b64i.replace(/^data:image\/png;base64,/, '');

    fs.writeFile(this.STORAGE_PATH + '/' + name, base64Data, 'base64', function(err) {
      console.log(err);
    });
  }
}

module.exports = Storage;
