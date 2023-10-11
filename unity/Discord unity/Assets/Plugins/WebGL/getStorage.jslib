mergeInto(LibraryManager.library, {
  GetUserId: function () {
    const userId = localStorage.getItem('userId');
    const bufferSize = lengthBytesUTF8(userId) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(userId, buffer, bufferSize);
    return buffer;
  },
  GetGuildId: function () {
    const guildId = localStorage.getItem('guildId');
    const bufferSize = lengthBytesUTF8(guildId) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(guildId, buffer, bufferSize);
    return buffer;
  },
});
