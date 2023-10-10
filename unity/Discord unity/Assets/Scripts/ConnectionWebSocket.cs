using System;
using UnityEngine;
using NativeWebSocket;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

public class ConnectionWebSocket : MonoBehaviour
{
    private WebSocket ws;

    public const string ServerUrl = "ws://localhost:8080";
    public static event Action<string> OnMessageReceived;
    public event Action OnWebSocketOpen;

    async void Start()
    {
        ws = new WebSocket(ServerUrl);
        string[] paramsUrl = Regex.Split(Application.absoluteURL, "&");
        string userId = paramsUrl[0].Split("="[0])[1];
        string guildId = paramsUrl[1].Split("="[0])[1];

        ws.OnOpen += () =>
        {
            Debug.Log("WebSocket abierto");
            OnWebSocketOpen?.Invoke();

            var data = new
            {
                message = "getChannels",
                guildID = guildId,
                userID = userId
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