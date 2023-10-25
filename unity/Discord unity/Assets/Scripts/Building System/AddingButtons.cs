using UnityEngine;
using UnityEngine.UI;

public class AddingButtons : MonoBehaviour
{
    public Sprite[] textures;
    public GameObject buttonPrefab;
    void Start()
    {
        foreach (Sprite sprite in textures)
        {
            GameObject newButton = Instantiate(buttonPrefab) as GameObject;
            newButton.name = sprite.name;
            newButton.GetComponent<Image>().sprite = sprite;
            newButton.transform.SetParent(transform, false);
        }
    }
    void Update()
    {
        
    }
}
