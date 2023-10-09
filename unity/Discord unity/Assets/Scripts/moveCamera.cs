using UnityEngine;

public class MoveCamera : MonoBehaviour
{
    private Vector3 Origin;
    private Vector3 Difference;

    private bool isDraggin;


    public float sensitivity = 2.0f;

    void Start()
    {
    }

    void Update()
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
        if(isDraggin)
        {
            Camera.main.transform.position = Origin - Difference;
        }

    }
}