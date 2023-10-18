using UnityEngine;

public class RemoveCharacter : MonoBehaviour
{
    public void RemoveInScene(string userId)
    {
        GameObject userToLeft = GameObject.Find(userId);
        if (userToLeft != null)
        {
            Destroy(userToLeft);
        }
        else
        {
            Debug.LogWarning("GameObject with name " + userId + " not found.");
        }
    }
}
