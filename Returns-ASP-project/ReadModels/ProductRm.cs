namespace Returns_ASP_project.ReadModels
{
    public record ProductRm(
        Guid Id,
        string ProductName,
        string ShortCode,
        decimal Price,
        decimal Weight
        );
}
