/**
 * @param {Object} user - Current user object
 * @param {Array<Object>} candidates - List of other user objects to consider
 * @param {Array<Object>} feedbacks - List of Feedback documents for this user
 * @return {Object} - The selected next profile
 */
function selectNextProfile(user, candidates, feedbacks) {
 
  const liked = feedbacks.filter(f => f.like).map(f => String(f.to));
  const disliked = feedbacks.filter(f => !f.like).map(f => String(f.to));
  
  const likeCount = { uni: {}, degree: {}, interest: {} };
  const dislikeCount = { uni: {}, degree: {}, interest: {} };
  feedbacks.forEach(f => {
   
    const target = candidates.find(u => String(u._id) === String(f.to));
    if (!target) return;
    if (f.like) {
      likeCount.uni[target.university] = (likeCount.uni[target.university]||0) + 1;
      likeCount.degree[target.degree]   = (likeCount.degree[target.degree]||0) + 1;
      target.interests.forEach(i => {
        likeCount.interest[i] = (likeCount.interest[i]||0) + 1;
      });
    } else {
      dislikeCount.uni[target.university] = (dislikeCount.uni[target.university]||0) + 1;
      dislikeCount.degree[target.degree]   = (dislikeCount.degree[target.degree]||0) + 1;
      target.interests.forEach(i => {
        dislikeCount.interest[i] = (dislikeCount.interest[i]||0) + 1;
      });
    }
  });

  let bestProfile = null;
  let bestScore = -Infinity;

  candidates.forEach(candidate => {
    let score = 0;
 
    if (candidate.university === user.university) score += 5;
    if (candidate.degree === user.degree) score += 3;
    if (candidate.city === user.city) score += 4;
    const ageDiff = Math.abs((candidate.age || 0) - (user.age || 0));
    if (ageDiff <= 2) score += 2;
    const commonInterests = (candidate.interests || []).filter(i => user.interests?.includes(i));
    score += 2 * commonInterests.length;

   
    if (likeCount.uni[candidate.university]) {
      score += 2 * likeCount.uni[candidate.university];
    }
    if (likeCount.degree[candidate.degree]) {
      score += likeCount.degree[candidate.degree];
    }
    commonInterests.forEach(i => {
      if (likeCount.interest[i]) score += likeCount.interest[i];
    });

    
    if (dislikeCount.uni[candidate.university]) {
      score -= 2 * dislikeCount.uni[candidate.university];
    }
    if (dislikeCount.degree[candidate.degree]) {
      score -= dislikeCount.degree[candidate.degree];
    }
    commonInterests.forEach(i => {
      if (dislikeCount.interest[i]) score -= dislikeCount.interest[i];
    });

    if (candidate.university !== user.university) score += 1;
    if (!commonInterests.length) score += 1; 
    if (score > bestScore) {
      bestScore = score;
      bestProfile = candidate;
    }
  });


  return bestProfile || candidates[0];
}

module.exports = { selectNextProfile };
