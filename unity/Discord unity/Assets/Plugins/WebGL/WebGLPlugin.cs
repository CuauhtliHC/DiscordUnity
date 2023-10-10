using UnityEngine;
using System.Runtime.InteropServices;

public class WebGLPlugin : MonoBehaviour
{
    [DllImport("__Internal")]
    public static extern void GetStorage();

    void Start()
    {
        GetStorage();
    }
}