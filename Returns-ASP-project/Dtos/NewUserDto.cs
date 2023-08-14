using System.ComponentModel.DataAnnotations;

namespace Returns_ASP_project.Dtos
{
    public record NewUserDto(
        [Required][EmailAddress][StringLength(100, MinimumLength = 2)] string Email,
        [Required][MinLength(2)][MaxLength(35)] string FirstName,
        [Required][MinLength(2)][MaxLength(35)] string LastName
        );
   
}
