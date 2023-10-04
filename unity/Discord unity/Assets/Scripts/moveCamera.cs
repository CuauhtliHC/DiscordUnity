using UnityEngine;

public class MoveCamera : MonoBehaviour
{
    private Vector3 Origin;
    private Vector3 Difference;

    private bool drag = false;


    public float sensitivity = 2.0f;

    void Start()
    {
    }

    void Update()
    {
        if (Input.GetMouseButton(0))
        {
            Difference = (Camera.main.ScreenToWorldPoint(Input.mousePosition)) - Camera.main.transform.position;
            if (drag == false)
            {
                drag = true;
                Origin = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            }
        }
        else
        {
            drag = false;
        }
        if(drag)
        {
            Camera.main.transform.position = Origin - Difference;
        }

    }
}