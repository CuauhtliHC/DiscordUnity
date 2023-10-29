mergeInto(LibraryManager.library, {
  GetUserId: function () {
    const userId = window.parent.getUser();
    const bufferSize = lengthBytesUTF8(userId) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(userId, buffer, bufferSize);
    return buffer;
  },
  GetGuildId: function () {
    const queryString = window.parent.location.search;
    const urlParams = new URLSearchParams(queryString);
    const guildId = urlParams.get('id');
    const bufferSize = lengthBytesUTF8(guildId) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(guildId, buffer, bufferSize);
    return buffer;
  },
});
