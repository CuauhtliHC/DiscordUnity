using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UserSpawn : MonoBehaviour
{
    public void InstantiateUserPrefab(string userName, string userID, string channelId, GameObject prefabCharacter, GameObject parentObject, Vector2 position)
    {
        GameObject prefabInstance = Instantiate(prefabCharacter, position, Quaternion.identity);
        prefabInstance.transform.parent = parentObject.transform;
        prefabInstance.name = userID;
        UserInfo userData = prefabInstance.AddComponent<UserInfo>();
        userData.UserName = userName;
        userData.UserId = userID;
        userData.inChannel = channelId;
    }
}
