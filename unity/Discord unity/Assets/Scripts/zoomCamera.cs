using UnityEngine;

public class ZoomCamera : MonoBehaviour
{
    public Camera mainCamera;
    public float zoomSpeed = 2.0f;
    public float minZoom = 2.0f;
    public float maxZoom = 10.0f;

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