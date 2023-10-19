using System;
using System.Collections.Generic;
using UnityEngine;
using Firesplash.GameDevAssets.SocketIOPlus;

public class AddChannel : MonoBehaviour
{
    [Serializable]
    private class ChannelData
    {
        public string id;
        public string name;
    }

    [Serializable]
    private class ChannelsWithUsers
    {
        public string channelId;
        public string channelName;
        public List<User> users;
    }

    [Serializable]
    private class User
    {
        public string UserName;
        public string UserId;
        public float? positionX;
        public float? positionY;
    }

    [Serializable]
    private class ChannelsData
    {
        public List<ChannelData> channels;
        public List<ChannelsWithUsers> usersOnline;
    }

    private readonly Queue<ChannelData> channelsQueue = new();
    private readonly Queue<ChannelsWithUsers> listChannelsUsers = new();
    private UserSpawn userSpawn;

    public GameObject prefabToSpawn;
    public GameObject parentObject;
    public GameObject prefabCharacter;


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
        InstantiateUser();
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
            ChannelsData dataReceived = ioEvent.GetPayload<ChannelsData>(0);
            foreach (ChannelData channel in dataReceived.channels)
            {
                channelsQueue.Enqueue(channel);
            }
            if (dataReceived.usersOnline != null && dataReceived.usersOnline.Count > 0)
            {
                foreach (ChannelsWithUsers channelWithUsers in dataReceived.usersOnline)
                {
                    listChannelsUsers.Enqueue(channelWithUsers);
                }
            }
            else
            {
                Debug.Log("La lista de usuarios en línea está vacía o nula.");
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
        try
        {
            while (channelsQueue.Count > 0)
            {
                ChannelData channel = channelsQueue.Dequeue();
                string channelName = channel.name;
                Vector2 position = new(vectorY, vectorX);
                GameObject prefabInstance = Instantiate(prefabToSpawn, position, Quaternion.identity);
                prefabInstance.transform.parent = parentObject.transform;
                prefabInstance.name = channel.id;
                ChannelInfo channelData = prefabInstance.AddComponent<ChannelInfo>();
                channelData.ChannelName = channel.name;
                channelData.ChannelId = channel.id;
                vectorY -= 3.492f;
                vectorX -= 2.0096f;
            }
        }
        catch (Exception ex)
        {
            Debug.Log("Error al crear la instancia: " + ex.Message);
        }
    }

    private void InstantiateUser()
    {
        try
        {
            while (listChannelsUsers.Count > 0)
            {
                ChannelsWithUsers channelWithUsers = listChannelsUsers.Dequeue();
                GameObject channel = GameObject.Find(channelWithUsers.channelId);
                foreach (User user in channelWithUsers.users)
                {
                    if(user.positionY != null || user.positionX != null )
                    {
                        float x = user.positionX ?? 0;
                        float y = user.positionY ?? 0;
                        userSpawn.InstantiateUserPrefab(user.UserName, user.UserId, channelWithUsers.channelId, prefabCharacter, parentObject, CreateVector2(x, y, 0));
                    }
                    else { 
                    userSpawn.InstantiateUserPrefab(user.UserName, user.UserId, channelWithUsers.channelId, prefabCharacter, parentObject, CreateVector2(channel.transform.position.x, channel.transform.position.y, 0.7536f));
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Debug.Log("Error al crear la instancia: " + ex.Message);
        }
    }

    private Vector2 CreateVector2 (float x, float y, float rest)
    {
        Vector2 cordinatesChannel = new(x, y - rest);
        Grid grid = parentObject.GetComponent<Grid>();
        Vector3Int cellPosition = grid.WorldToCell(cordinatesChannel);
        Vector3 center = grid.GetCellCenterWorld(cellPosition);
        Vector2 center2D = new(center.x, center.y);
        return center2D;
    }
}