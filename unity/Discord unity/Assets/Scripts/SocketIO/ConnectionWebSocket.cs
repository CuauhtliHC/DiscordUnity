using System;
using UnityEngine;
using Firesplash.GameDevAssets.SocketIOPlus;
using System.Runtime.InteropServices;


public class ConnectionWebSocket : MonoBehaviour
{
    public SocketIOClient io;
    [DllImport("__Internal")]
    private static extern string GetUserId();

    [DllImport("__Internal")]
    private static extern string GetGuildId();

    private const string ServerUrl = "ws://localhost:8080";
    public static event Action<SocketIOEvent> OnChannelsReceived;
    public static event Action<SocketIOEvent> OnUserJoinReceived;
    public static event Action<SocketIOEvent> OnUserLeftReceived;
    public static event Action<SocketIOEvent> OnUserSwitchReceived;
    public static event Action<SocketIOEvent> OnUserMoventReceived;
    public static event Action<string> OnDisconnectedUser;

    struct DisconectedReason
    {
        public string reason;
    }

    void Start()
    {
        io.D.On("connect", () =>
        {
            var data = new
            {
                guildID = "1087941237924966420",
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

        io.D.On("playerMovement", (ioEvent) =>
        {
            OnUserMoventReceived?.Invoke(ioEvent);
        });

        io.D.On<string>("closeReason", (ioEvent)=> {
            OnDisconnectedUser?.Invoke(ioEvent);
        });

        io.Connect(ServerUrl);
    }

    private void OnDestroy()
    {
        io.Disconnect();
    }
}