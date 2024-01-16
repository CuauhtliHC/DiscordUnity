using UnityEngine;
using UnityEngine.UI;

public class AddingButtons : MonoBehaviour
{
    public Sprite[] textures;
    public Sprite[] furnitureTextures;
    public GameObject buttonPrefab;
    public GameObject horizontalZone;
    public float buttonWidth = 59.4f;
    public GameObject buttonFurniture;
    public GameObject buttonFloor;
    void Update()
    {
        if (buttonFloor.GetComponent<ClickChangeMenu>().isClicked == true)
        {
            foreach (Transform child in transform)
            {
                GameObject.Destroy(child.gameObject);
            }
            horizontalZone.GetComponent<RectTransform>().sizeDelta = new Vector2(textures.Length * buttonWidth + 12f, 73.5408f);
            Debug.Log("Floor");
            buttonFloor.GetComponent<ClickChangeMenu>().isClicked = false;
            foreach (Sprite sprite in textures)
            {
                GameObject newButton = Instantiate(buttonPrefab) as GameObject;
                newButton.name = sprite.name;
                newButton.GetComponent<Image>().sprite = sprite;
                newButton.transform.SetParent(transform, false);
            }
        }
        if (buttonFurniture.GetComponent<ClickChangeMenu>().isClicked == true)
        {
            foreach (Transform child in transform)
            {
                GameObject.Destroy(child.gameObject);
            }
            horizontalZone.GetComponent<RectTransform>().sizeDelta = new Vector2(furnitureTextures.Length * buttonWidth + 12f, 73.5408f);
            Debug.Log("Furniture");
            buttonFurniture.GetComponent<ClickChangeMenu>().isClicked = false;
            foreach (Sprite sprite in furnitureTextures)
            {
                GameObject newButton = Instantiate(buttonPrefab) as GameObject;
                newButton.name = sprite.name;
                newButton.GetComponent<Image>().sprite = sprite;
                newButton.transform.SetParent(transform, false);
            }
        }
    }
}
