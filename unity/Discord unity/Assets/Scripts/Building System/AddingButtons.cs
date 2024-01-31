using UnityEngine;
using UnityEngine.UI;

public class AddingButtons : MonoBehaviour
{
    public Sprite[] floorTextures;
    public Sprite[] furnitureTextures;
    public GameObject buttonPrefab;
    public GameObject horizontalZone;
    public float buttonWidth = 59.4f;
    private string _menu = "floor";
    private bool _isMenuChanged = false;

    public string Menu
    {
        get { return _menu; }
        set
        {
            _menu = value;
            _isMenuChanged = true;
        }
    }

    private void Start()
    {
        CreateButtons();
    }

    void Update()
    {
        if (_isMenuChanged)
        {
            CreateButtons();
            _isMenuChanged = false;
        }
    }

    private void CreateButtons()
    {
        foreach (Transform child in transform)
        {
            GameObject.Destroy(child.gameObject);
        }

        Sprite[] currentTextures = (_menu == "floor") ? floorTextures : furnitureTextures;
        horizontalZone.GetComponent<RectTransform>().sizeDelta = new Vector2(currentTextures.Length * buttonWidth + 12f, 73.5408f);

        foreach (Sprite sprite in currentTextures)
        {
            GameObject newButton = Instantiate(buttonPrefab) as GameObject;
            newButton.name = sprite.name;
            newButton.GetComponent<Image>().sprite = sprite;
            newButton.transform.SetParent(transform, false);
        }
    }
}