using System;
using System.Collections.Generic;
using UnityEngine;
using Firesplash.GameDevAssets.SocketIOPlus;
using UnityEngine.Tilemaps;

public class ProcessingData : MonoBehaviour
{
    [Serializable]
    private class ChannelData
    {
        public string id;
        public string name;
        public List<Coordinates> coordinates;
        public List<User> users;
    }

    [Serializable]
    private class User
    {
        public string channelId;
        public string channelName;
        public string UserName;
        public string UserId;
        public float? positionX;
        public float? positionY;
    }

    [Serializable]
    private class RespondeData
    {
        public List<ChannelData> channels;
    }

    [Serializable]
    private class Coordinates
    {
        public float coordinateX;
        public float coordinateY;
        public string tileName;
    }

    private readonly Queue<ChannelData> channelsQueue = new();
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
        ConnectionWebSocket.OnChannelsReceived += HandleWebSocketMessage;
    }

    private void Update()
    {
        InstantiateChannel();
    }

    private void HandleWebSocketMessage(SocketIOEvent ioEvent)
    {

        if (ioEvent.payloads.Count < 1)
        {
            Debug.LogError("Received TechData without payload");
            return;
        }

        try
        {
            RespondeData dataReceived = ioEvent.GetPayload<RespondeData>(0);
            foreach (ChannelData channel in dataReceived.channels)
            {
                channelsQueue.Enqueue(channel);
            }
        }
        catch (Exception e)
        {
            Debug.LogException(e);
        }
    }

    private void InstantiateChannel()
    {
        float vectorY = 0, vectorX = 0;
            while (channelsQueue.Count > 0)
            {
                ChannelData channel = channelsQueue.Dequeue();
                Vector2 position = new(vectorY, vectorX);
                GameObject prefabInstance = Instantiate(prefabToSpawn, position, Quaternion.identity);
                prefabInstance.transform.parent = parentObject.transform;
                prefabInstance.name = channel.id;
                ChannelInfo channelData = prefabInstance.AddComponent<ChannelInfo>();
                channelData.ChannelName = channel.name;
                channelData.ChannelId = channel.id;
                vectorY -= 3.492f;
                vectorX -= 2.0096f;
                if(channel.users != null && channel.users.Count > 0)
                {
                    foreach (User user in channel.users)
                    {
                        float x = user.positionX ?? 0;
                        float y = user.positionY ?? 0;
                        userSpawn.InstantiateUserPrefab(user.UserName, user.UserId, user.channelId, prefabCharacter, parentToPj, CreateVector2(x, y, 0, channel.id));
                    }
                }
            }
    }

    private Vector2 CreateVector2 (float x, float y, float rest, string channelId)
    {
        Tilemap channel = GameObject.Find(channelId).GetComponent<Tilemap>();
        Vector3Int centerCellPosition = new Vector3Int(0, 0, 0);
        Vector3 centerWorldPosition = channel.GetCellCenterWorld(centerCellPosition);
        if(x != 0 || y != 0)
        {
            return new Vector2(x, y);
        }
        Vector2 center2D = new(centerWorldPosition.x - 0.007f, centerWorldPosition.y + 0.2524f);
        return center2D;
    }
}