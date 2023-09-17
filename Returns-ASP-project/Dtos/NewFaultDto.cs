using System.ComponentModel.DataAnnotations;

namespace Returns_ASP_project.Dtos
{
    public record NewFaultDto(
        [Required]
        string Name,
        string? Description);
}
