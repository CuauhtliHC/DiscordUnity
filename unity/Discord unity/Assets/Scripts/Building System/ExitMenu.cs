using UnityEngine;
using UnityEngine.Tilemaps;
using TMPro;
using System.Collections.Generic;
using Firesplash.GameDevAssets.SocketIOPlus;
public class ExitMenu : MonoBehaviour
{
    Dictionary<string, Dictionary<string, List<object>>> dataVectors = new();
    private Dictionary<string, List<object>> dataVectorsFloor = new();
    private Dictionary<string, List<object>> dataVectorsFurniture = new();

    public GameObject panelMenu;
    public GameObject buttonMove;
    public GameObject prefabToBuild;
    public GameObject parentToPj;
    public GameObject parentChannel;
    public GameObject parentChannelFurniture;
    public SocketIOClient io;

    private void Start()
    {
        io = GameObject.Find("SocketIOSample").GetComponent<SocketIOClient>();
    }
    public void IWasClicked()
    {
        if (parentToPj != null)
        {
            foreach (Transform children in parentToPj.GetComponentsInChildren<Transform>())
            {
                if (children.name == "TextMeshPro")
                {
                    TextMeshPro textName = children.GetComponent<TextMeshPro>();
                    textName.color = new Color(1.0f, 1.0f, 1.0f, 1f);
                }
                else if (children.name != "ParentPj")
                {
                    SpriteRenderer spriteRenderer = children.GetComponent<SpriteRenderer>();
                    spriteRenderer.color = new Color(1.0f, 1.0f, 1.0f, 1f);
                }
            }
        }
        panelMenu.SetActive(false);
        buttonMove.SetActive(true);
        prefabToBuild = GameObject.Find("preInstance");
        if (prefabToBuild != null)
        {
            Destroy(prefabToBuild);
        }
        foreach (Transform child in parentChannel.transform)
        {
            dataVectorsFloor[child.name] = new List<object>();
            Tilemap tilemapComponent = child.GetComponent<Tilemap>();
            for(int x = -2; x <= 2; x++)
            {
                for(int y = -2; y <= 2; y++)
                {
                    Vector3Int vec = new(x, y, 0);
                    TileBase tile = tilemapComponent.GetTile(vec);
                    var objVector = new { X = x, Y = y, tileName = tile.name };
                    dataVectorsFloor[child.name].Add(objVector);
                }    
            }
            
        }
        foreach (Transform child in parentChannelFurniture.transform)
        {
            int index = child.name.IndexOf("_");
            string name = child.name.Substring(0, index);
            dataVectorsFurniture[name] = new List<object>();
            Tilemap tilemapComponent = child.GetComponent<Tilemap>();
            for (int x = -2; x <= 2; x++)
            {
                for (int y = -2; y <= 2; y++)
                {
                    Vector3Int vec = new(x, y, 0);
                    TileBase tile = tilemapComponent.GetTile(vec);
                    if(tile != null)
                    {
                        var objVector = new { X = x, Y = y, tileName = tile.name };
                        dataVectorsFurniture[name].Add(objVector);
                    } else if(x == 2 && y == 2 && dataVectorsFurniture[name].Count == 0)
                    {
                        dataVectorsFurniture.Remove(name);
                    }
                }
            }

        }
        dataVectors.Add("Floor", dataVectorsFloor);
        dataVectors.Add("Furniture", dataVectorsFurniture);
        io.D.Emit("updateGuild", dataVectors);
    }
}
