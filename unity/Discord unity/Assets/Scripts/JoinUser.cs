using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;
using Newtonsoft.Json;

public class JoinUser : MonoBehaviour
{
    public GameObject parentObject;
    public GameObject prefabCharacter;

    private UserSpawn userSpawn;
    public class SocketMessage
    {
        public string UserName;
        public string UserId;
        public string ChannelName;
        public string ChannelId;
        public string Type;
    }
    void Start()
    {
        ConnectionWebSocket.OnMessageReceived += OnMessageReceived;
        userSpawn = FindObjectOfType<UserSpawn>(); ;
    }

    void Update()
    {
        if (!string.IsNullOrEmpty(messageReceived))
        {
            SocketMessage response = JsonConvert.DeserializeObject<SocketMessage>(messageReceived);
            if (response.Type == "userJoinChannel")
            {
                GameObject userObject = GameObject.Find(response.UserId);
                GameObject channel = GameObject.Find(response.ChannelId);
                Vector2 cordinatesChannel = new Vector2(channel.transform.position.x, channel.transform.position.y - 0.7536f);
                Grid grid = parentObject.GetComponent<Grid>();
                Vector3Int cellPosition = grid.WorldToCell(cordinatesChannel);
                Vector3 center = grid.GetCellCenterWorld(cellPosition);
                Vector2 center2D = new Vector2(center.x, center.y);
                if (userObject != null)
                {
                    userObject.transform.position = center2D;
                }
                else
                {
                    userSpawn.InstantiateUserPrefab(response.UserName, response.UserId, response.ChannelId, prefabCharacter, parentObject, center2D);
                }
            } else if (response.Type == "userSwitchedChannel")
            {
                GameObject userObject = GameObject.Find(response.UserId);
                GameObject channel = GameObject.Find(response.ChannelId);
                Vector2 cordinatesChannel = new Vector2(channel.transform.position.x, channel.transform.position.y - 0.7536f);
                Grid grid = parentObject.GetComponent<Grid>();
                Vector3Int cellPosition = grid.WorldToCell(cordinatesChannel);
                Vector3 center = grid.GetCellCenterWorld(cellPosition);
                Vector2 center2D = new Vector2(center.x, center.y);
                if (userObject != null)
                {
                    UserInfo userInfo = userObject.GetComponent<UserInfo>();
                    userInfo.inChannel = response.ChannelId;
                    userObject.transform.position = center2D;
                }
                else
                {
                    userSpawn.InstantiateUserPrefab(response.UserName, response.UserId, response.ChannelId, prefabCharacter, parentObject, center2D);
                }
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

