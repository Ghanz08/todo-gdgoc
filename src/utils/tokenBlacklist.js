const tokenBlacklist = new Set();

module.exports = {
  addToBlacklist: (token) => tokenBlacklist.add(token),
  isBlacklisted: (token) => tokenBlacklist.has(token),
};
