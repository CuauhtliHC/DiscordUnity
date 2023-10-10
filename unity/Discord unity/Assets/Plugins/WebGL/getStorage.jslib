mergeInto(LibraryManager.library, {
  GetStorage: () => {
    const userId = localStorage.getItem('userId');
    const guildId = localStorage.getItem('guildId');
    window.alert(UTF8ToString(userId));
  },
});
