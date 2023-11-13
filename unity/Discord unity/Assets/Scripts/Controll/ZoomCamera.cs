using UnityEngine;
using UnityEngine.InputSystem;

public class ZoomCamera : MonoBehaviour
{
    private Camera mainCamera;
    private readonly float zoomSpeed = 0.2f;
    private readonly float minZoom = 2.0f;
    private readonly float maxZoom = 10.0f;

    void Start()
    {
        if (mainCamera == null)
        {
            mainCamera = Camera.main;
        }
    }

    public void Zoom(InputAction.CallbackContext ctx)
    {
        float value = ctx.ReadValue<Vector2>().y / 100f;

        if(Mathf.Abs(value) > 0.1f)
        {
            float newZoom = mainCamera.orthographicSize - value * zoomSpeed;

            newZoom = Mathf.Clamp(newZoom, minZoom, maxZoom);

            mainCamera.orthographicSize = newZoom;
        }
    }
}