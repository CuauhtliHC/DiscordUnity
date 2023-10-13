using System;
using UnityEngine;
using NativeWebSocket;
using Newtonsoft.Json;
using System.Runtime.InteropServices;

public class ConnectionWebSocket : MonoBehaviour
{
    private WebSocket ws;
    [DllImport("__Internal")]
    private static extern string GetUserId();

    [DllImport("__Internal")]
    private static extern string GetGuildId();

    private const string ServerUrl = "ws://localhost:8080";
    public static event Action<string> OnMessageReceived;
    public event Action OnWebSocketOpen;

    async void Start()
    {
        ws = new WebSocket(ServerUrl);

        ws.OnOpen += () =>
        {
            Debug.Log("WebSocket abierto");
            OnWebSocketOpen?.Invoke();
            var data = new
            {
                message = "getChannels",
                guildID = "309462354004017152",
                userID = "278345841734057994"
            };
            string requestData = JsonConvert.SerializeObject(data);
            SendMessageToWebSocket(requestData);
        };

        ws.OnClose += (e) =>
        {
            Debug.Log("WebSocket cerrado");
        };

        ws.OnMessage += (bytes) =>
        {
            var message = System.Text.Encoding.UTF8.GetString(bytes);
            OnMessageReceived?.Invoke(message);
        };

        ws.OnError += (e) =>
        {
            Debug.LogError($"Error en WebSocket: {e}");
        };

        await ws.Connect();
    }

    void Update()
    {
#if !UNITY_WEBGL || UNITY_EDITOR
        ws.DispatchMessageQueue();
#endif
    }

    public async void SendMessageToWebSocket(string message)
    {
        await ws.SendText(message);
    }

    private async void OnDestroy()
    {
        await ws.Close();
    }
}