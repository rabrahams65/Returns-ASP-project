using System.ComponentModel.DataAnnotations;

namespace Returns_ASP_project.Dtos
{
    public record NewOwnerDto(
        [Required][MinLength(2)][MaxLength(35)] string FirstName,
        [Required][MinLength(2)][MaxLength(35)] string LastName);
}
