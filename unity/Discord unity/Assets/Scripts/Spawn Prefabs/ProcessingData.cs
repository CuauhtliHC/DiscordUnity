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
        //InstantiateUser();
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
            //foreach (ChannelData channel in dataReceived.channels)
            //{
            //    channelsQueue.Enqueue(channel);
            //}
            //if (dataReceived.usersOnline != null && dataReceived.usersOnline.Count > 0)
            //{
            //    foreach (ChannelsWithUsers channelWithUsers in dataReceived.usersOnline)
            //    {
            //        listChannelsUsers.Enqueue(channelWithUsers);
            //    }
            //}
            //else
            //{
            //    Debug.Log("La lista de usuarios en línea está vacía o nula.");
            //}
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
                        float x = user.positionX ?? 2;
                        float y = user.positionY ?? 2;
                        userSpawn.InstantiateUserPrefab(user.UserName, user.UserId, user.channelId, prefabCharacter, parentToPj, CreateVector2(x, y, 0, channel.id));
                    }
                }
            }
    }

    //private void InstantiateUser()
    //{
    //    try
    //    {
    //        while (listChannelsUsers.Count > 0)
    //        {
    //            ChannelsWithUsers channelWithUsers = listChannelsUsers.Dequeue();
    //            GameObject channel = GameObject.Find(channelWithUsers.channelId);
    //            foreach (User user in channelWithUsers.users)
    //            {
    //                if(user.positionY != null || user.positionX != null )
    //                {
    //                    float x = user.positionX ?? 0;
    //                    float y = user.positionY ?? 0;
    //                    parentToPj = GameObject.Find("ParentPj");
    //                    if(parentToPj == null)
    //                    {
    //                        parentToPj = new("ParentPj");
    //                        parentToPj.transform.parent = parentObject.transform;
    //                    }
    //                    userSpawn.InstantiateUserPrefab(user.UserName, user.UserId, channelWithUsers.channelId, prefabCharacter, parentToPj, CreateVector2(x, y, 0));
    //                }
    //                else 
    //                {
    //                    parentToPj = GameObject.Find("ParentPj");
    //                    if (parentToPj == null)
    //                    {
    //                        parentToPj = new("ParentPj");
    //                        parentToPj.transform.parent = parentObject.transform;
    //                    }
    //                    userSpawn.InstantiateUserPrefab(user.UserName, user.UserId, channelWithUsers.channelId, prefabCharacter, parentToPj, CreateVector2(channel.transform.position.x, channel.transform.position.y, 0.7536f));
    //                }
    //            }
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        Debug.Log("Error al crear la instancia: " + ex.Message);
    //    }
    //}

    private Vector2 CreateVector2 (float x, float y, float rest, string channelId)
    {
        Tilemap channel = GameObject.Find(channelId).GetComponent<Tilemap>();
        BoundsInt bounds = channel.cellBounds;
        int width = bounds.size.x;
        int height = bounds.size.y;
        Debug.Log(width / 2);
        Vector3Int centerCellPosition = new Vector3Int(width, height, 0);
        Vector3 centerWorldPosition = channel.GetCellCenterWorld(centerCellPosition);
        Vector2 center2D = new(centerWorldPosition.x, centerWorldPosition.y);
        return center2D;
    }
}