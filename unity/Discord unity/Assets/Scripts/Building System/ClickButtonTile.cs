using UnityEngine;
using UnityEngine.Tilemaps;
using UnityEngine.InputSystem;

public class ClickButtonTile : MonoBehaviour
{
    private Grid grid;
    private Vector2 previousMousePosition;
    private string tileName;
    private Tile tileFound;
    public GameObject preInstance;
    public GameObject prefabToBuild;

    private void Start()
    {
        grid = FindObjectOfType<Grid>();
    }
    void Update()
    {
        RaycastHit2D hit = Physics2D.Raycast(GetPositionMouse(0), Vector2.zero);
        if (transform.name == tileName && GetPositionMouse(0) != previousMousePosition && preInstance != null)
        {
            preInstance.transform.position = GetPositionMouse(rest: 0.25f);
            if(hit.collider != null && Mouse.current.leftButton.wasPressedThisFrame)
            {
                Tilemap tilemap = hit.collider.gameObject.GetComponent<Tilemap>();
                tilemap.SetTile(GetPositionMouseInt(), tileFound);
            }
        }
        previousMousePosition = GetPositionMouse(0);
    }
    public void IWasClicked()
    {
        Tile tile = Resources.Load<Tile>("Prefab/Floor/" + transform.name);
        Sprite sprite = Resources.Load<Sprite>("Sprites/Floor/" + transform.name);
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
        Debug.Log(transform.name);
        tileName = transform.name;
    }

    public Vector2 GetPositionMouse(float rest)
    {
        Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        Vector3Int cellPosition = grid.WorldToCell(mousePosition);
        Vector3 center = grid.GetCellCenterWorld(cellPosition);
        Vector2 center2D = new(center.x, center.y - rest);
        return center2D;
    }

    public Vector3Int GetPositionMouseInt()
    {
        Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        Vector3Int cellPosition = grid.WorldToCell(mousePosition);
        return cellPosition;
    }
}
