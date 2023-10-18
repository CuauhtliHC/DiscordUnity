using UnityEngine;

public class ZoomCamera : MonoBehaviour
{
    private Camera mainCamera;
    private readonly float zoomSpeed = 2.0f;
    private readonly float minZoom = 2.0f;
    private readonly float maxZoom = 10.0f;

    void Start()
    {
        if (mainCamera == null)
        {
            mainCamera = Camera.main;
        }
    }

    void Update()
    {
        float scrollInput = Input.GetAxis("Mouse ScrollWheel");

        if (scrollInput != 0)
        {
            float newZoom = mainCamera.orthographicSize - scrollInput * zoomSpeed;

            newZoom = Mathf.Clamp(newZoom, minZoom, maxZoom);

            mainCamera.orthographicSize = newZoom;
        }
    }
}