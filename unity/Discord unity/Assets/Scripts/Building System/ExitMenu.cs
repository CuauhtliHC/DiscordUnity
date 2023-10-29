using UnityEngine;

public class ExitMenu : MonoBehaviour
{
    public GameObject panelMenu;
    public GameObject buttonMove;
    public GameObject prefabToBuild;
    public GameObject parentToPj;
    public void IWasClicked()
    {
        if (parentToPj != null)
        {
            parentToPj.SetActive(true);
        }
        panelMenu.SetActive(false);
        buttonMove.SetActive(true);
        prefabToBuild = GameObject.Find("preInstance");
        if (prefabToBuild != null)
        {
            Destroy(prefabToBuild);
        }
    }
}
