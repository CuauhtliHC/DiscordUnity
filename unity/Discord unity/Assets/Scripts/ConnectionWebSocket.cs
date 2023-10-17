using System;
using UnityEngine;
using System.Collections.Generic;
using NativeWebSocket;
using Firesplash.GameDevAssets.SocketIOPlus;
using Newtonsoft.Json;
using System.Runtime.InteropServices;


public class ConnectionWebSocket : MonoBehaviour
{
    public SocketIOClient io;
    [DllImport("__Internal")]
    private static extern string GetUserId();

    [DllImport("__Internal")]
    private static extern string GetGuildId();

    public class ChannelData
    {
        public string id;
        public string name;
    }

    public class ChannelsWithUsers
    {
        public string channelId;
        public string channelName;
        public List<User> users;
    }

    public class User
    {
        public string UserName;
        public string UserId;
    }

    public class ChannelsData
    {
        public List<ChannelData> channels;
        public List<ChannelsWithUsers> usersOnline;
    }

    private const string ServerUrl = "ws://localhost:8081";
    public static event Action<SocketIOEvent> OnChannelsReceived;
    public static event Action<SocketIOEvent> OnUserJoinReceived;
    public static event Action<SocketIOEvent> OnUserLeftReceived;
    public static event Action<SocketIOEvent> OnUserSwitchReceived;
    public event Action OnWebSocketOpen;

    void Start()
    {
        io.D.On("connect", () => {
            Debug.Log("LOCAL: Hey, we are connected!");
            var data = new
            {
                guildID = "309462354004017152",
                userID = "278345841734057994"
            };
            io.D.Emit("getChannels", data);
        });
        io.D.On("getChannels", (ioEvent) =>
        {
            OnChannelsReceived?.Invoke(ioEvent);
        });

        io.D.On("userJoinChannel", (ioEvent) =>
        {
            OnUserJoinReceived?.Invoke(ioEvent);
        });

        io.D.On("userLeftChannel", (ioEvent) =>
        {
            OnUserLeftReceived?.Invoke(ioEvent);
        });

        io.D.On("userSwitchedChannel", (ioEvent) =>
        {
            OnUserSwitchReceived?.Invoke(ioEvent);
        });

        io.Connect(ServerUrl);
    }

    private void OnDestroy()
    {
       
    }
}