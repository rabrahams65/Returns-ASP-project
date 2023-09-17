using System.ComponentModel.DataAnnotations;

namespace Returns_ASP_project.Dtos
{
    public record NewProductDto(
        [Required]
        string ProductName,
        [Required]
        string ShortCode,
        [Required]
        decimal Price,
        decimal Weight
        );
}
