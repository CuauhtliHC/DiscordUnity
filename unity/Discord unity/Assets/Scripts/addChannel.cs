using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class addChannel : MonoBehaviour
{
    public string apiUrl = "http://localhost:3001/api/guilds/channels/482690190838857730";
    public GameObject prefabToSpawn;
    public GameObject parentObject;

    [System.Serializable]
    public class ChannelData
    {
        public string name;
    }

    [System.Serializable]
    public class ChannelsData
    {
        public List<ChannelData> channels;
    }

    void Start()
    {
        StartCoroutine(LoadJSONAndSpawnObjects());
    }

    IEnumerator LoadJSONAndSpawnObjects()
    {
        UnityWebRequest www = UnityWebRequest.Get(apiUrl);
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Error al cargar el JSON desde la API: " + www.error);
            yield break;
        }

        string json = www.downloadHandler.text;

        ChannelsData channelsData = JsonUtility.FromJson<ChannelsData>(json);

        List<ChannelData> channels = channelsData.channels;

        float vectorY = 0;
        float vectorX = 0;

        foreach (ChannelData channel in channels)
        {
            string channelName = channel.name;
            Debug.Log("Nombre del canal: " + channelName);
            Vector2 position = new Vector2(vectorY, vectorX);
            GameObject prefabInstance = Instantiate(prefabToSpawn, position, Quaternion.identity);
            prefabInstance.transform.parent = parentObject.transform;

            vectorY -= 3f;
            vectorX -= 2f;
        }
    }
}