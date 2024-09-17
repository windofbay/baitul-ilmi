namespace FitrahAPI;

public class ResponseDTO<T>
{
    public string Message { get; set; } = null!;
    public string Status { get; set; } = null!;
    public T? Data { get; set; }
}
