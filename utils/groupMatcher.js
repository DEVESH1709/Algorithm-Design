/**
 @param {Array<Object>} users - List of user objects (all from the same city)
  @returns {Array<Array<Object>>} - Array of groups (each an array of 6 users)
 */
function formGroups(users) {
  const buckets = {};
  
  users.forEach(u => {
    const key = `${u.preferences.dietary}-${u.preferences.budget}`;
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(u);
  });

  const groups = [];

  Object.values(buckets).forEach(bucket => {
   
    shuffle(bucket);

  
    for (let i = 0; i + 5 < bucket.length; i += 6) {
      let group = bucket.slice(i, i + 6);

    
      group = optimizeInterestDiversity(group);

      groups.push(group);
    }

  
  });

  return groups;
}

 
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
 
function optimizeInterestDiversity(group) {
  const interestFreq = {};

  group.forEach(user => {
    (user.interests || []).forEach(interest => {
      interestFreq[interest] = (interestFreq[interest] || 0) + 1;
    });
  });

  const uniqueInterests = Object.keys(interestFreq).length;
  const isTooSimilar = Object.values(interestFreq).some(count => count === group.length);

  if (isTooSimilar || uniqueInterests <= 2) {
  
    return shuffle([...group]);
  }

  return group;
}

module.exports = { formGroups };
