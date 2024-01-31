using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClickChangeMenu : MonoBehaviour
{
    GameObject row;
    private void Start()
    {
        row = GameObject.Find("Row");
    }
    public void IWasClicked()
    {
        row.GetComponent<AddingButtons>().Menu = transform.name[(transform.name.IndexOf("_") + 1)..].ToLower();
    }
}
