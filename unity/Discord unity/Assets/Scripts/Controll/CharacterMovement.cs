using UnityEngine;
using System.Runtime.InteropServices;
using Firesplash.GameDevAssets.SocketIOPlus;
using UnityEngine.InputSystem;

public class CharacterMovement : MonoBehaviour
{
    private Grid grid;
    private Vector2 targetPosition;
    private bool isMoving = false;
    private string userName;
    private UserInfo userInfo;
    private static readonly Color transparentWhite = new Color(1.0f, 1.0f, 1.0f, 0f);
    private SocketMessage messageReceived;

    [DllImport("__Internal")]
    private static extern string GetUserId();

    public SocketIOClient io;

    private class SocketMessage
    {
        public float targetPositionX;
        public float targetPositionY;
        public string userID;
    }
    void Start()
    {
        ConnectionWebSocket.OnUserMoventReceived += OnMessageReceived;
        grid = FindObjectOfType<Grid>();
        userName = gameObject.name;
        userInfo = GetComponent<UserInfo>();
        io = GameObject.Find("SocketIOSample").GetComponent<SocketIOClient>();

    }

    private void Awake()
    {
        InputAction moveChacter = transform.GetComponent<PlayerInput>().actions.FindAction("ClickAndMove");
        moveChacter.performed += context => HandleInput(context);
    }


    void Update()
    {
        HandleReceiveMessage();
        MoveCharacter();
    }

    public void HandleInput(InputAction.CallbackContext ctx)
    {
        if (!ctx.performed || isMoving) return;
        SpriteRenderer spriteRenderer = transform.GetComponent<SpriteRenderer>();
        if (spriteRenderer.color == transparentWhite) return;
        Vector2 actualPosition = transform.position;
        Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Mouse.current.position.ReadValue());
        Vector3Int cellPosition = grid.WorldToCell(mousePosition);
        Vector3 center = grid.GetCellCenterWorld(cellPosition);
        Vector2 center2D = new(center.x, center.y);
        targetPosition = center2D;
        RaycastHit2D hit = Physics2D.Raycast(center2D, Vector2.zero);
        if (userName == "278345841734057994" && hit.collider != null)
        {
            string colliderName = hit.collider.gameObject.name;
            if (userInfo.inChannel == colliderName)
            {
                APathFinder aPathFinder = transform.GetComponent<APathFinder>();
                aPathFinder.Patfinding(colliderName, actualPosition, center2D);
                EmitPlayerMovement();
                MoveToTarget();
            }
        }
    }

    private void EmitPlayerMovement()
    {
        if (io.D.state == DataTypes.ConnectionState.CONNECTED)
        {
            var data = new
            {
                targetPosition = targetPosition.ToString(),
                userID = "278345841734057994"
            };
            io.D.Emit("playerMovement", data);
        }
    }

    private void HandleReceiveMessage()
    {
        if (messageReceived != null && transform.name == messageReceived.userID)
        {
            Vector3 positionPlayer = new(messageReceived.targetPositionX, messageReceived.targetPositionY);
            Vector3Int cellPosition = grid.WorldToCell(positionPlayer);
            Vector3 center = grid.GetCellCenterWorld(cellPosition);
            Vector2 center2D = new(center.x, center.y);
            targetPosition = center2D;
            MoveToTarget();
            messageReceived = null;
        }
    }

    private void MoveCharacter()
    {
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


    private void OnMessageReceived(SocketIOEvent ioEvent)
    {
        SocketMessage dataReceived = ioEvent.GetPayload<SocketMessage>(0);
        messageReceived = dataReceived;
    }

    void MoveToTarget()
    {
        if (!isMoving)
        {
            isMoving = true;
        }
    }
}