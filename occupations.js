occupations = [
{
  id: 1,
  name: 'Occupy DC',
  city: 'Washington',
  state: 'D.C.' 
},
{
  id: 2,
  name: 'Occupy Wall Street',
  city: 'New York',
  state: 'NY'
}
];

module.exports.all = occupations;

module.exports.find = function(id) {
  id = parseInt(id, 10);
  var found = null;
  occupationloop: for(occupation_index in occupations) {
    var occupation = occupations[occupation_index];
    if(occupation.id == id) {
      found = occupation;
      break occupationloop;    
    }
  };
  return found;
}

module.exports.set = function(id, occupation) {
  id = parseInt(id, 10);
  occupation.id = id;
  occupations[id-1] = occupation;
}

module.exports.new = function() {
  return {
    name: '',
    city: '',
    state: ''
  };
}

module.exports.insert = function(occupation) {
  var id = occupations.length + 1;
  occupation.id = id;
  occupations[id-1] = occupation;
  return id;
}