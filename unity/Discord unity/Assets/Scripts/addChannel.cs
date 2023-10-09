using System;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;

public class AddChannel : MonoBehaviour
{
    [Serializable]
    public class ChannelData
    {
        public string id;
        public string name;
    }

    [Serializable]
    public class ChannelsWithUsers
    {
        public string channelId;
        public string channelName;
        public List<User> users;
    }

    [Serializable]
    public class User
    {
        public string UserName;
        public string UserId;
    }

    [Serializable]
    public class ChannelsData
    {
        public List<ChannelData> channels;
        public string type;
        public List<ChannelsWithUsers> usersOnline;
    }

    private Queue<ChannelData> channelsQueue = new Queue<ChannelData>();
    private Queue<ChannelsWithUsers> listChannelsUsers = new Queue<ChannelsWithUsers>();
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
        ConnectionWebSocket.OnMessageReceived += HandleWebSocketMessage;
    }

    private void Update()
    {
        InstantiateChannel();
        InstantiateUser();
    }

    private void HandleWebSocketMessage(string message)
    {
        ChannelsData channelsData = JsonConvert.DeserializeObject<ChannelsData>(message);
        if (channelsData.type == "channels")
        {
            foreach (ChannelData channel in channelsData.channels)
            {
                channelsQueue.Enqueue(channel);
            }
            if (channelsData.usersOnline != null && channelsData.usersOnline.Count > 0)
            {
                foreach (ChannelsWithUsers channelWithUsers in channelsData.usersOnline)
                {
                    listChannelsUsers.Enqueue(channelWithUsers);
                }
            }
            else
            {
                Debug.Log("La lista de usuarios en línea está vacía o nula.");
            }
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
                Vector2 position = new Vector2(vectorY, vectorX);
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

                Vector2 cordinatesChannel = new Vector2(channel.transform.position.x, channel.transform.position.y - 0.7536f);
                Grid grid = parentObject.GetComponent<Grid>();
                Vector3Int cellPosition = grid.WorldToCell(cordinatesChannel);
                Vector3 center = grid.GetCellCenterWorld(cellPosition);
                Vector2 center2D = new Vector2(center.x, center.y);
                foreach (User user in channelWithUsers.users)
                {
                    userSpawn.InstantiateUserPrefab(user.UserName, user.UserId, channelWithUsers.channelId, prefabCharacter, parentObject, center2D);
                }
            }
        }
        catch (Exception ex)
        {
            Debug.Log("Error al crear la instancia: " + ex.Message);
        }
    }
}