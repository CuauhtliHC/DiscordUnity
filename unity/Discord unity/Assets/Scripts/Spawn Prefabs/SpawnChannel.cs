using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;

public class SpawnChannel : MonoBehaviour
{

    private UserSpawn userSpawn;

    public GameObject prefabToSpawn;
    public GameObject parentObject;
    public GameObject prefabCharacter;
    public GameObject parentToPj;

    void Start()
    {
        userSpawn = FindObjectOfType<UserSpawn>();
        if (userSpawn == null)
        {
            Debug.LogError("No se encontró un objeto UserSpawn en la escena.");
        }
    }
    public void InstantiateChannel(Queue<ProcessingData.ChannelData> channelsQueue)
    {
        float vectorY = 0, vectorX = 0;
        while (channelsQueue.Count > 0)
        {
            ProcessingData.ChannelData channel = channelsQueue.Dequeue();
            Vector2 position = new(vectorY, vectorX);
            GameObject prefabInstance = Instantiate(prefabToSpawn, position, Quaternion.identity);
            prefabInstance.transform.parent = parentObject.transform;
            prefabInstance.name = channel.id;
            ChannelInfo channelData = prefabInstance.AddComponent<ChannelInfo>();
            channelData.ChannelName = channel.name;
            channelData.ChannelId = channel.id;
            vectorY -= 3.492f;
            vectorX -= 2.0096f;
            if (channel.users != null && channel.users.Count > 0)
            {
                foreach (ProcessingData.User user in channel.users)
                {
                    float x = user.positionX ?? 0;
                    float y = user.positionY ?? 0;
                    userSpawn.InstantiateUserPrefab(user.UserName, user.UserId, user.channelId, prefabCharacter, parentToPj, CreateVector2(x, y, channel.id));
                }
            }
        }
    }

    private Vector2 CreateVector2(float x, float y, string channelId)
    {
        GameObject channel = GameObject.Find(channelId);
        Vector2 cordinatesChannel = new(channel.transform.position.x, channel.transform.position.y);
        Grid grid = FindObjectOfType<Grid>();
        Vector3Int cellPosition = grid.WorldToCell(cordinatesChannel);
        Vector3 center = grid.GetCellCenterWorld(cellPosition);
        if (x != 0 || y != 0)
        {
            return new Vector2(x, y);
        }
        Vector2 center2D = new(center.x, center.y);
        return center2D;
    }
}
