const saveState = (state) => {
  const now = new Date();
  const ttl = 43200;
  try {
    const serializedState = JSON.stringify({
      guilds: state,
      expiry: now.getTime() + ttl,
    });
    localStorage.setItem('arrayGuilds', serializedState);
  } catch (e) {
    console.error(e);
  }
};

const loadStorage = () => {
  const now = new Date();
  try {
    const serializedState = JSON.parse(localStorage.getItem('arrayGuilds'));
    if (!serializedState) return undefined;
    else if (now.getTime() > serializedState.expiry) {
      localStorage.removeItem('arrayGuilds');
      return undefined;
    }
    return serializedState;
  } catch (e) {
    return undefined;
  }
};

export { loadStorage, saveState };
