using UnityEngine;
using TMPro;

public class ClickButtonMove : MonoBehaviour
{
    public GameObject panelMenu;
    public GameObject parentToPj;

    private void Start()
    {
        panelMenu.SetActive(false);
    }
    public void IWasClicked()
    {
        parentToPj = GameObject.Find("ParentPj");
        if(parentToPj != null)
        {
            foreach (Transform children in parentToPj.GetComponentsInChildren<Transform>())
            {
                if(children.name == "TextMeshPro")
                {
                    TextMeshPro textName = children.GetComponent<TextMeshPro>();
                    textName.color = new Color(1.0f, 1.0f, 1.0f, 0f);
                } 
                else if (children.name != "ParentPj")
                {
                    SpriteRenderer spriteRenderer = children.GetComponent<SpriteRenderer>();
                    spriteRenderer.color = new Color(1.0f, 1.0f, 1.0f, 0f);
                }
            }
        }
        panelMenu.SetActive(true);
        gameObject.SetActive(false);
    }
}
