using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;

public class APathFinder : MonoBehaviour
{
    public List<(int, int)> Patfinding(string nameChannel, Vector2 initialCoo, Vector2 endCoo)
    {
        Tilemap fornitureChannel = GameObject.Find(nameChannel + "_furniture").GetComponent<Tilemap>();
        List<(int, int)> openNodes = new();
        List<(int, int)> closeNodes = new();
        List<(int, int)> path = new();
        openNodes = new List<(int, int)>();
        Tilemap channel = GameObject.Find(nameChannel).GetComponent<Tilemap>();
        Vector3Int initialTile = channel.WorldToCell(initialCoo);
        Vector3Int endTile = channel.WorldToCell(endCoo);
        if (initialTile != endTile)
        {
            openNodes.Add((initialTile.x, initialTile.y));
        }
        else
        {
            List<(int, int)> returnPathInitial = new()
            {
                (initialTile.x, initialTile.y)
            };
            return returnPathInitial;
        }
        while (openNodes.Count > 0)
        {
            // Paso 3: Seleccionar el nodo con el costo total más bajo
            int lowestCostIndex = GetLowestCostIndex(openNodes, (endTile.x, endTile.y));
            (int, int) currentNode = openNodes[lowestCostIndex];
            openNodes.RemoveAt(lowestCostIndex);

            // Paso 4: Verificar si se alcanzó el nodo final
            if (currentNode == (endTile.x, endTile.y))
            {
                foreach ((int, int) node in closeNodes)
                {
                    path.Add(node);
                }
                path.Add(currentNode);
                break;
            }

            // Paso 5: Obtener los nodos adyacentes y agregarlos a la lista abierta
            List<(int, int)> neighbors = GetNeighbors(currentNode, channel, fornitureChannel);
            foreach ((int, int) neighbor in neighbors)
            {
                // Verificar si el nodo ya se encuentra en la lista cerrada
                if (closeNodes.Contains((neighbor.Item1, neighbor.Item2)))
                {
                    continue;
                }

                // Verificar si el nodo ya se encuentra en la lista abierta
                int neighborIndex = openNodes.FindIndex(node => node == (neighbor.Item1, neighbor.Item2));
                if (neighborIndex != -1)
                {
                    // Paso 6: Verificar si el nuevo costo es menor
                    int newCost = CalculateCost(currentNode, neighbor) + Heuristic(neighbor, (endTile.x, endTile.y));
                    if (newCost < CalculateCost(openNodes[neighborIndex], neighbor))
                    {
                        // Actualizar el costo del nodo en la lista abierta
                        openNodes[neighborIndex] = (neighbor.Item1, neighbor.Item2);
                    }
                }
                else
                {
                    // Agregar el nodo a la lista abierta
                    openNodes.Add((neighbor.Item1, neighbor.Item2));
                }
            }

            // Agregar el nodo actual a la lista cerrada
            closeNodes.Add(currentNode);           
        }
        return path;
    }

    private int GetLowestCostIndex(List<(int, int)> nodes, (int, int) endTile)
    {
        int lowestCost = int.MaxValue;
        int lowestCostIndex = -1;
        for (int i = 0; i < nodes.Count; i++)
        {
            int cost = CalculateCost(nodes[i], endTile) + Heuristic(nodes[i], endTile);
            if (cost < lowestCost)
            {
                lowestCost = cost;
                lowestCostIndex = i;
            }
        }
        return lowestCostIndex;
    }

    private List<(int, int)> GetNeighbors((int, int) currentNode, Tilemap channel, Tilemap fornitureChannel)
    {
        Vector3Int currentVector = new(currentNode.Item1, currentNode.Item2, 0);
        Vector3Int bottomVector = new(currentVector.x - 1, currentVector.y, currentVector.z);
        Vector3Int topVector = new(currentVector.x + 1, currentVector.y, currentVector.z);
        Vector3Int rightVector = new(currentVector.x, currentVector.y - 1, currentVector.z);
        Vector3Int leftVector = new(currentVector.x, currentVector.y + 1, currentVector.z);
        List<(int, int)> listNeighnors = new();
        Tile bottomTile = channel.GetTile<Tile>(bottomVector);
        Tile topTile = channel.GetTile<Tile>(topVector);
        Tile rightTile = channel.GetTile<Tile>(rightVector);
        Tile leftTile = channel.GetTile<Tile>(leftVector);
        if (bottomTile != null && fornitureChannel.GetTile<Tile>(bottomVector) == null)
        {
            listNeighnors.Add((bottomVector.x, bottomVector.y));
        }
        if (topTile != null && fornitureChannel.GetTile<Tile>(topVector) == null)
        {
            listNeighnors.Add((topVector.x, topVector.y));
        }
        if (rightTile != null && fornitureChannel.GetTile<Tile>(rightVector) == null)
        {
            listNeighnors.Add((rightVector.x, rightVector.y));
        }
        if (leftTile != null && fornitureChannel.GetTile<Tile>(leftVector) == null)
        {
            listNeighnors.Add((leftVector.x, leftVector.y));
        }
        return listNeighnors;
    }

    private int CalculateCost((int, int) currentNode, (int, int) neighbor)
    {
        // Aquí debes calcular el costo desde el nodo actual hasta el vecino dado.
        // Puedes usar la distancia entre los nodos o cualquier otra medida según tu aplicación.
        return 0;
    }

    private int Heuristic((int, int) currentNode, (int, int) endNode)
    {
        int heuristic = (Math.Abs(currentNode.Item1 - endNode.Item1) + Math.Abs(currentNode.Item2 - endNode.Item2));
        return heuristic;
    }
}