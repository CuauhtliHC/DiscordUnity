using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovingToCenter : MonoBehaviour
{
    private UserInfo userInfo;
    private Grid grid;
    void Start()
    {
        ConnectionWebSocket.OnUserHasLeftRoom += OnUserHasLeftRoomReceived;
        userInfo = GetComponent<UserInfo>();
        grid = FindObjectOfType<Grid>();
    }

    void Update()
    {
        if(messageReceived != null)
        {
            GameObject channel = GameObject.Find(userInfo.inChannel);
            transform.position = CreateVector2(channel.transform.position.x, channel.transform.position.y, 0.7536f);
            messageReceived = null;
        }
    }

    private void OnUserHasLeftRoomReceived(string ioEvent)
    {
        messageReceived = ioEvent;
    }

    private Vector2 CreateVector2(float x, float y, float rest)
    {
        Vector2 cordinatesChannel = new(x, y - rest);
        Vector3Int cellPosition = grid.WorldToCell(cordinatesChannel);
        Vector3 center = grid.GetCellCenterWorld(cellPosition);
        Vector2 center2D = new(center.x, center.y);
        return center2D;
    }

    private string messageReceived;
}
