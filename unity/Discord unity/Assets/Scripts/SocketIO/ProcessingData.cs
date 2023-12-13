using System;
using System.Collections.Generic;
using UnityEngine;
using Firesplash.GameDevAssets.SocketIOPlus;

public class ProcessingData : MonoBehaviour
{
    [Serializable]
    public class ChannelData
    {
        public string id;
        public string name;
        public List<Coordinates> coordinatesArray;
        public List<User> users;
    }

    [Serializable]
    public class User
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
    public class Coordinates
    {
        public int coordinateX;
        public int coordinateY;
        public string tileName;
    }

    public readonly Queue<ChannelData> channelsQueue = new();
    private SpawnChannel spawnChannel;

    void Start()
    {
        spawnChannel = FindObjectOfType<SpawnChannel>();
        ConnectionWebSocket.OnChannelsReceived += HandleWebSocketMessage;
    }

    private void Update()
    {
        spawnChannel.InstantiateChannel(channelsQueue);
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
}