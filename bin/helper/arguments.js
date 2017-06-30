module.exports  = function() {
  const sequence = {};

  process.argv.forEach(function (val, index, array) {
    regex = /(\w+)=(\d+)/.exec(val);
    if(regex != null && regex != undefined) {
      param = regex[1];
      value = parseInt(regex[2]);
      sequence[param] = value;
    }
  });

  return sequence;
};
