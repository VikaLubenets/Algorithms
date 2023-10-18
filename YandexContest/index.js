function wrapper(func) {
    const uniqueUsers = new Set();
    const savedUsers = new Map();
  
    return function(credentials, ...args) {
      const { login, password, date } = credentials;
  
      if (!date || !login || typeof login !== 'string' || !password || typeof password !== 'string') {
        return [...savedUsers.entries()].map(([date, users]) => ({
          date,
          users,
        }));
      }
  
      const key = date.toISOString().slice(0, 10);
      const userKey = `${login}:${password}`;
      const value = (savedUsers.get(key) || 0) + 1;
  
      if (!uniqueUsers.has(userKey)) {
        uniqueUsers.add(userKey);
        savedUsers.set(key, value);
      }

      func(...args);
  
      return [...savedUsers.entries()].map(([date, users]) => ({
        date,
        users,
      }));
    };
  }

module.exports = wrapper;