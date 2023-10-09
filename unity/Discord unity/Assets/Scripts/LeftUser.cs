using System;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;

public class LeftUser : MonoBehaviour
{

    private RemoveCharacter removeCharacter;
    public class SocketMessage
    {
        public string UserName;
        public string UserId;
        public string ChannelName;
        public string ChannelId;
        public string Type;
    }
    private void Start()
    {
        ConnectionWebSocket.OnMessageReceived += OnMessageReceived;
        removeCharacter = FindObjectOfType<RemoveCharacter>();
    }

    private void Update()
    {
        if (!string.IsNullOrEmpty(messageReceived))
        {
            SocketMessage response = JsonConvert.DeserializeObject<SocketMessage>(messageReceived);
            if (response.Type == "userLeftChannel")
            {
                removeCharacter.RemoveInScene(response.UserId);
            }
            messageReceived = null;
        }
    }

    private void OnMessageReceived(string message)
    {
        messageReceived = message;
    }

    private string messageReceived;
}
