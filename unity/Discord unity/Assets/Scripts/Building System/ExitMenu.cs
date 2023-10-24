using UnityEngine;

public class ExitMenu : MonoBehaviour
{
    public GameObject panelMenu;
    public GameObject buttonMove;
    public void IWasClicked()
    {
        panelMenu.SetActive(false);
        buttonMove.SetActive(true);
    }
}
