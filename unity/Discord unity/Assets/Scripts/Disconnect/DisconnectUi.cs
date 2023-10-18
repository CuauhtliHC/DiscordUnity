using UnityEngine;
using TMPro;


public class DisconnectUi : MonoBehaviour
{
    public GameObject canvasDisconnected;
    void Start()
    {
        ConnectionWebSocket.OnDisconnectedUser += OnDiscconectedReceived;
        canvasDisconnected.SetActive(false);
    }

    void Update()
    {
        if (messageReceived != null)
        {
            TextMeshProUGUI textReason = canvasDisconnected.transform.Find("Disconnect Reason").GetComponent<TextMeshProUGUI>();
            textReason.text = messageReceived;
            canvasDisconnected.SetActive(true);
        }
        
    }

    private void OnDiscconectedReceived(string ioEvent)
    {
        messageReceived = ioEvent;
    }

    private string messageReceived;
}
