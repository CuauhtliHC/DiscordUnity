using UnityEngine;
using UnityEngine.Tilemaps;
using UnityEngine.InputSystem;

public class ClickButtonTile : MonoBehaviour
{
    public Grid grid;
    public Vector2 previousMousePosition;
    public string tileName;
    public Tile tileFound;
    public GameObject preInstance;
    public GameObject prefabToBuild;
    public RaycastHit2D hit;
    public GameObject row;

    private void Start()
    {
        row = GameObject.Find("Row");
        grid = FindObjectOfType<Grid>();
    }
    public void Update()
    {   
        if (transform.name == tileName && GetPositionMouse(0) != previousMousePosition && preInstance != null)
        {
            hit = Physics2D.Raycast(GetPositionMouse(0), Vector2.zero);
            preInstance.transform.position = GetPositionMouse(rest: 0.25f);           
        }
        previousMousePosition = GetPositionMouse(0);
    }

    public void ClickToSpawn()
    {
        if (hit.collider != null)
        {
            string menu = row.GetComponent<AddingButtons>().Menu;
            if (menu == "floor")
            {
                Tilemap tilemap = hit.collider.gameObject.GetComponent<Tilemap>();
                Vector3Int cellPosition = tilemap.WorldToCell(GetPositionMouse(0));
                tilemap.SetTile(cellPosition, tileFound);
            }
            else
            {
                Tilemap tilemap = GameObject.Find(hit.collider.gameObject.name + "_furniture").GetComponent<Tilemap>();
                Vector3Int cellPosition = tilemap.WorldToCell(GetPositionMouse(0));
                tilemap.SetTile(cellPosition, tileFound);
            }
        }
    }
    public void IWasClicked()
    {
        string menu = row.GetComponent<AddingButtons>().Menu;
        string uppercasedMenu = char.ToUpper(menu[0]) + menu[1..];
        Tile tile = Resources.Load<Tile>("Prefab/" + uppercasedMenu + "/" + transform.name);
        Sprite sprite = Resources.Load<Sprite>("Sprites/" + uppercasedMenu + "/" + transform.name);
        if (tile != null && sprite != null)
        {
            prefabToBuild = GameObject.Find("preInstance");
            if(prefabToBuild != null)
            {
                Destroy(prefabToBuild);
            }
            tileFound = tile;
            preInstance = new ("preInstance");
            preInstance.AddComponent<SpriteRenderer>();
            preInstance.GetComponent<SpriteRenderer>().sprite = sprite;
            SpriteRenderer spriteRenderer = preInstance.GetComponent<SpriteRenderer>();
            spriteRenderer.color = new Color(1.0f, 1.0f, 1.0f, 0.5f);
            preInstance.transform.position = GetPositionMouse(rest: 0.25f);
            preInstance.transform.parent = grid.transform;
        } else
        {
            Debug.Log("Tile Not Found");
        }
        tileName = transform.name;
    }

    public Vector2 GetPositionMouse(float rest)
    {
        Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Mouse.current.position.ReadValue());
        Vector3Int cellPosition = grid.WorldToCell(mousePosition);
        Vector3 center = grid.GetCellCenterWorld(cellPosition);
        Vector2 center2D = new(center.x, center.y - rest);
        return center2D;
    }

    public Vector3Int GetPositionMouseInt()
    {
        Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Mouse.current.position.ReadValue());
        Vector3Int cellPosition = grid.WorldToCell(mousePosition);
        return cellPosition;
    }
}
