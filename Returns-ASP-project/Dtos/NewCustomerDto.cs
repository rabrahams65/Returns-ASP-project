using System.ComponentModel.DataAnnotations;

namespace Returns_ASP_project.Dtos
{
    public record NewCustomerDto(
         
        [Required]
        string CustomerName,
        [Required]
        string ShortCode,
        [EmailAddress]
        string? Email,
        string? Address
        );
}
