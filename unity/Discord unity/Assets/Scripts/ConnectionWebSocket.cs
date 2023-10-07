using System;
using UnityEngine;
using WebSocketSharp;
using Newtonsoft.Json;

public class ConnectionWebSocket : MonoBehaviour
{
    private WebSocket ws;

    public const string serverURL = "ws://localhost:8080";
    public static event Action<string> OnMessageReceived;
    public event Action OnWebSocketOpen;

    private void Start()
    {
        Debug.Log("Start");
        ws = new WebSocket(serverURL);

        ws.OnOpen += (sender, e) =>
        {
            Debug.Log("WebSocket abierto");
            OnWebSocketOpen?.Invoke();
        };

        ws.OnClose += (sender, e) =>
        {
            Debug.Log("WebSocket cerrado");
        };

        ws.OnMessage += (sender, e) =>
        {
            OnMessageReceived?.Invoke(e.Data);
        };

        ws.OnError += (sender, e) =>
        {
            Debug.LogError("Error en WebSocket: " + e.Message);
        };

        ws.Connect();
    }

    public void SendMessageToWebSocket(string message)
    {
        ws.Send(message);
    }

    private void OnDestroy()
    {
        if (ws != null && ws.IsAlive)
        {
            ws.Close();
        }
    }
}