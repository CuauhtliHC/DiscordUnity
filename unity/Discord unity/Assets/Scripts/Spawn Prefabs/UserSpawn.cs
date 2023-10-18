using UnityEngine;
using TMPro;

public class UserSpawn : MonoBehaviour
{
    public void InstantiateUserPrefab(string userName, string userID, string channelId, GameObject prefabCharacter, GameObject parentObject, Vector2 position)
    {
        GameObject prefabInstance = Instantiate(prefabCharacter, position, Quaternion.identity);
        prefabInstance.transform.SetParent(parentObject.transform);
        prefabInstance.name = userID;
        UserInfo userData = prefabInstance.AddComponent<UserInfo>();
        userData.UserName = userName;
        userData.UserId = userID;
        userData.inChannel = channelId;
        GameObject textMeshProGameObject = new("TextMeshPro");
        TextMeshPro textMeshProComponent = textMeshProGameObject.AddComponent<TextMeshPro>();
        Vector2 positionText = position;
        positionText.y += 0.5f;
        textMeshProComponent.text = userName;
        textMeshProComponent.fontSize = 1.5f;
        textMeshProComponent.alignment = TextAlignmentOptions.Center;
        textMeshProComponent.fontStyle = FontStyles.Bold;
        textMeshProComponent.transform.SetParent(prefabInstance.transform);
        textMeshProComponent.transform.position = positionText;
    }
}
