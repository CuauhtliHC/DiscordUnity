using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;

public class SpawnChannel : MonoBehaviour
{

    private UserSpawn userSpawn;

    public GameObject prefabChannelSpawn;
    public GameObject parentChannelFloor;
    public GameObject prefabCharacter;
    public GameObject parentToPj;
    public GameObject parentChannelFurniture;
    public GameObject prefabTilemapFurniture;

    void Start()
    {
        userSpawn = FindObjectOfType<UserSpawn>();
        if (userSpawn == null)
        {
            Debug.LogError("Not found User Spawn");
        }
    }
    public void InstantiateChannel(Queue<ProcessingData.ChannelData> channelsQueue)
    {
        float vectorY = 0, vectorX = 0;
        while (channelsQueue.Count > 0)
        {
            ProcessingData.ChannelData channel = channelsQueue.Dequeue();
            Vector2 position = new(vectorY, vectorX);
            GameObject prefabChannelFloorInstance = Instantiate(prefabChannelSpawn, position, Quaternion.identity);
            GameObject prefabChannelFurnitureInstance = Instantiate(prefabTilemapFurniture, position, Quaternion.identity);
            prefabChannelFloorInstance.transform.parent = parentChannelFloor.transform;
            prefabChannelFurnitureInstance.transform.parent = parentChannelFurniture.transform;
            prefabChannelFloorInstance.name = channel.id;
            prefabChannelFurnitureInstance.name = channel.id + "_furniture";
            ChannelInfo channelData = prefabChannelFloorInstance.AddComponent<ChannelInfo>();
            ChannelInfo channelFurnitureData = prefabChannelFurnitureInstance.AddComponent<ChannelInfo>();
            channelData.ChannelName = channel.name;
            channelFurnitureData.ChannelName = channel.name;
            channelData.ChannelId = channel.id;
            channelFurnitureData.ChannelId = channel.id;
            vectorY -= 3.492f;
            vectorX -= 2.0096f;
            if(channel.coordinatesData.Floor != null && channel.coordinatesData.Floor.Count > 0)
            {
                foreach (ProcessingData.Coordinates coordinate in channel.coordinatesData.Floor)
                {
                    Tile tile = Resources.Load<Tile>("Prefab/Floor/" + coordinate.tileName);
                    if (tile != null)
                    {
                        Tilemap tilemap = prefabChannelFloorInstance.GetComponent<Tilemap>();
                        Vector3Int cellPosition = new(coordinate.coordinateX, coordinate.coordinateY, 0);
                        tilemap.SetTile(cellPosition, tile);
                    }
                    else
                    {
                        Debug.Log("Tile Not Found");
                    }
                };
            }
            if (channel.coordinatesData.Furniture != null && channel.coordinatesData.Furniture.Count > 0)
            {
                foreach (ProcessingData.Coordinates coordinate in channel.coordinatesData.Furniture)
                {
                    Tile tile = Resources.Load<Tile>("Prefab/Furniture/" + coordinate.tileName);
                    if (tile != null)
                    {
                        Tilemap tilemap = prefabChannelFurnitureInstance.GetComponent<Tilemap>();
                        Vector3Int cellPosition = new(coordinate.coordinateX, coordinate.coordinateY, 0);
                        tilemap.SetTile(cellPosition, tile);
                    }
                    else
                    {
                        Debug.Log("Tile Not Found");
                    }
                };
            }
            prefabChannelFloorInstance.GetComponent<Tilemap>().CompressBounds();
            if (channel.users != null && channel.users.Count > 0)
            {
                foreach (ProcessingData.User user in channel.users)
                {
                    float x = user.positionX ?? 0;
                    float y = user.positionY ?? 0;
                    userSpawn.InstantiateUserPrefab(user.UserName, user.UserId, user.channelId, prefabCharacter, parentToPj, CreateVector2(x, y, channel.id));
                }
            }
        }
    }

    private Vector2 CreateVector2(float x, float y, string channelId)
    {
        GameObject channel = GameObject.Find(channelId);
        Vector2 cordinatesChannel = new(channel.transform.position.x, channel.transform.position.y);
        Grid grid = FindObjectOfType<Grid>();
        Vector3Int cellPosition = grid.WorldToCell(cordinatesChannel);
        Vector3 center = grid.GetCellCenterWorld(cellPosition);
        if (x != 0 || y != 0)
        {
            return new Vector2(x, y);
        }
        Vector2 center2D = new(center.x, center.y);
        return center2D;
    }
}
