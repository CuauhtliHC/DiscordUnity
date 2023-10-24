using UnityEngine;

public class ClickButtonMove : MonoBehaviour
{
    public GameObject panelMenu;

    private void Start()
    {
        panelMenu.SetActive(false);
    }
    public void IWasClicked()
    {
        panelMenu.SetActive(true);
        gameObject.SetActive(false);
    }
}
