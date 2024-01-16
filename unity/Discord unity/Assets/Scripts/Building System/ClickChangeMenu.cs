using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClickChangeMenu : MonoBehaviour
{
    public bool isClicked = false;
    public GameObject anotherButtonMenu;

    void Start()
    {
        if(transform.name == "ButtonFloor")
        {
            isClicked = true;
        }
    }
    public void IWasClicked()
    {
        isClicked = true;
        anotherButtonMenu.GetComponent<ClickChangeMenu>().isClicked = false;
    }
}
