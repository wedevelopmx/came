function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports  = function() {
  const sequence = {};

  process.argv.forEach(function (val, index, array) {
    regex = /(\w+)=([\d-]+)/.exec(val);
    if(regex != null && regex != undefined) {
      param = regex[1];
      value = isNumeric(regex[2]) ? parseInt(regex[2]) : regex[2];
      sequence[param] = value;
    }
  });

  return sequence;
};
