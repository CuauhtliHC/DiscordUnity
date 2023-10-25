using UnityEngine;

public class MoveCamera : MonoBehaviour
{
    public GameObject panel;
    private Vector3 Origin;
    private Vector3 Difference;

    private bool isDraggin;
    void Update()
    {
        if (panel.activeSelf && RectTransformUtility.RectangleContainsScreenPoint(panel.GetComponent<RectTransform>(), Input.mousePosition))
        {
            return;
        }
        if (Input.mousePosition.x >= 0 && Input.mousePosition.x < Screen.width &&
            Input.mousePosition.y >= 0 && Input.mousePosition.y < Screen.height)
        {
            if (Input.GetMouseButton(0))
            {
                Difference = (Camera.main.ScreenToWorldPoint(Input.mousePosition)) - Camera.main.transform.position;
                if (!isDraggin)
                {
                    isDraggin = true;
                    Origin = Camera.main.ScreenToWorldPoint(Input.mousePosition);
                }
            }
            else
            {
                isDraggin = false;
            }
            if (isDraggin)
            {
                Camera.main.transform.position = Origin - Difference;
            }
        }

    }
}