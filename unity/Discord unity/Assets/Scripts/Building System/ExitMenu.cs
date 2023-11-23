using UnityEngine;
using UnityEngine.Tilemaps;
using TMPro;
public class ExitMenu : MonoBehaviour
{
    public GameObject panelMenu;
    public GameObject buttonMove;
    public GameObject prefabToBuild;
    public GameObject parentToPj;
    public GameObject parentChannel;
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
            Tilemap tilemapComponent = child.GetComponent<Tilemap>(); 
            for(int x = 0; x <= 4; x++)
            {
                for(int y = 0; y <= 4; y++)
                {
                    Vector3Int vec = new(x, y, 0);
                    Debug.Log("Vector: " + x + " " + y + "Tile: " + tilemapComponent.GetTile(vec));
                }    
            }
            
        }
    }
}
