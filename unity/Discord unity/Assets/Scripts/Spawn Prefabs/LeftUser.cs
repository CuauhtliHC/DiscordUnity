using UnityEngine;
using Firesplash.GameDevAssets.SocketIOPlus;

public class LeftUser : MonoBehaviour
{

    private RemoveCharacter removeCharacter;
    private class SocketMessage
    {
        public string UserName;
        public string UserId;
        public string ChannelName;
        public string ChannelId;
        public string Type;
    }
    private void Start()
    {
        ConnectionWebSocket.OnUserLeftReceived += OnMessageReceived;
        removeCharacter = FindObjectOfType<RemoveCharacter>();
    }

    private void Update()
    {
        if (messageReceived != null)
        {
            removeCharacter.RemoveInScene(messageReceived.UserId);
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
