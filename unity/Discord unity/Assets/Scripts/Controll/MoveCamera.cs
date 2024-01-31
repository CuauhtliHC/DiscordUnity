using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;

public class MoveCamera : MonoBehaviour
{
    #region Variables

    private Vector3 _origin;
    private Vector3 _difference;

    private Camera _mainCamera;

    private bool _isDragging;

    #endregion

    private void Awake() => _mainCamera = Camera.main;

    public void OnDrag(InputAction.CallbackContext ctx)
    {
        if(EventSystem.current.IsPointerOverGameObject()) return;
        if (ctx.performed) _origin = GetMousePosition;
        _isDragging = ctx.started || ctx.performed;
    }

    void Update()
    {
        if (!_isDragging) return;

        _difference = GetMousePosition - _mainCamera.transform.position;
        _mainCamera.transform.position = _origin - _difference;
    }

    private Vector3 GetMousePosition => _mainCamera.ScreenToWorldPoint(Mouse.current.position.ReadValue());
}