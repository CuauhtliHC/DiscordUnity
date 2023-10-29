using UnityEngine;

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
            parentToPj.SetActive(false);
        }
        panelMenu.SetActive(true);
        gameObject.SetActive(false);
    }
}
