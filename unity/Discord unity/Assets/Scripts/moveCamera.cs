using UnityEngine;

public class moveCamera : MonoBehaviour
{
    private Vector3 lastMousePosition;
    private Camera mainCamera;

    public float sensitivity = 2.0f;

    void Start()
    {
        mainCamera = Camera.main;
        lastMousePosition = Input.mousePosition;
    }

    void Update()
    {
        if (Input.GetMouseButton(0))
        {
            Vector3 mouseDelta = Input.mousePosition - lastMousePosition;

            Vector3 cameraMove = mainCamera.ScreenToWorldPoint(Vector3.zero) - mainCamera.ScreenToWorldPoint(mouseDelta);

            mainCamera.transform.Translate(cameraMove * sensitivity);

            lastMousePosition = Input.mousePosition;
        }
    }
}