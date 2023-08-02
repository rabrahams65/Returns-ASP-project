namespace Returns_ASP_project.ReadModels
{
    public record CustomerRm(
        Guid Id,
        string CustomerName,
        string ShortCode,
        string Email,
        string Address
        );
}
