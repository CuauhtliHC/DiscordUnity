using UnityEngine;
using Firesplash.GameDevAssets.SocketIOPlus;

public class SwitchUser : MonoBehaviour
{
    public GameObject parentObject;
    public GameObject prefabCharacter;

    private UserSpawn userSpawn;
    private class SocketMessage
    {
        public string UserName;
        public string UserId;
        public string ChannelName;
        public string ChannelId;
    }
    private void Start()
    {
        ConnectionWebSocket.OnUserSwitchReceived += OnMessageReceived;
        userSpawn = FindObjectOfType<UserSpawn>();
    }

    private void Update()
    {
        if (messageReceived != null)
        {
            GameObject userObject = GameObject.Find(messageReceived.UserId);
            GameObject channel = GameObject.Find(messageReceived.ChannelId);
            Vector2 cordinatesChannel = new Vector2(channel.transform.position.x, channel.transform.position.y - 0.7536f);
            Grid grid = parentObject.GetComponent<Grid>();
            Vector3Int cellPosition = grid.WorldToCell(cordinatesChannel);
            Vector3 center = grid.GetCellCenterWorld(cellPosition);
            Vector2 center2D = new Vector2(center.x, center.y);
            if (userObject != null)
            {
                UserInfo userInfo = userObject.GetComponent<UserInfo>();
                userInfo.inChannel = messageReceived.ChannelId;
                userObject.transform.position = center2D;
            }
            else
            {
                userSpawn.InstantiateUserPrefab(messageReceived.UserName, messageReceived.UserId, messageReceived.ChannelId, prefabCharacter, parentObject, center2D);
            }
            messageReceived = null;
        }
    }

    private void OnMessageReceived(SocketIOEvent ioEvent)
    {
        SocketMessage dataReceived = ioEvent.GetPayload<SocketMessage>(0);
        messageReceived = dataReceived;
    }

    private SocketMessage messageReceived;
}
