using Returns_ASP_project.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Returns_ASP_project.Dtos
{
    public record ReturnDto(
        Guid? Id,
        DateTime? DocDate,
        [Required]
        Guid? CustomerId,
        [Required]
        Guid? ProductId,
        int? QtyOnDoc,
        DateTime? BatchDate,
        Guid? OwnerId,
        Guid? FaultId,
        string? DocNo,
        int? QtyReturned,
        bool? resolved,
        string? Comment,
        Guid UserId,
        DateTime DateUpdated);

}
