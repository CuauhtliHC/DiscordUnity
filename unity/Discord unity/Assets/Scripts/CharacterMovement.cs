using UnityEngine;

public class CharacterMovement : MonoBehaviour
{
    public Grid grid;
    public float cellSizeX = 0.873f;
    public float cellSizeY = 0.5024f;

    private Vector2 targetPosition;
    private bool isMoving = false;
    private string userName;
    private UserInfo userInfo;

    private void Start()
    {
        grid = FindObjectOfType<Grid>();
        userName = gameObject.name;
        userInfo = GetComponent<UserInfo>();
    }

    private void Update()
    {
        if (Input.GetMouseButtonDown(1))
        {
            Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            Vector3Int cellPosition = grid.WorldToCell(mousePosition);
            Vector3 center = grid.GetCellCenterWorld(cellPosition);
            Vector2 center2D = new Vector2(center.x, center.y);
            targetPosition = center2D;
            RaycastHit2D hit = Physics2D.Raycast(center2D, Vector2.zero);

            if (userName == "278345841734057994" && hit.collider != null)
            {
                string colliderName = hit.collider.gameObject.name;
                if (userInfo.inChannel == colliderName)
                {
                    MoveToTarget();
                } 
            }
        }

        if (isMoving)
        {
            float step = 5f * Time.deltaTime;
            transform.position = Vector2.MoveTowards(transform.position, targetPosition, step);

            if (Vector2.Distance(transform.position, targetPosition) < 0.001f)
            {
                isMoving = false;
            }
        }
    }

    void MoveToTarget()
    {
        if (!isMoving)
        {
            isMoving = true;
        }
    }
}