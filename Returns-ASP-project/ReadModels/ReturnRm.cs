using Returns_ASP_project.Domain.Entities;

namespace Returns_ASP_project.ReadModels
{
    public record ReturnRm(
        Guid Id,
        DateTime? DocDate,
        Guid? CustomerId,
        Guid? ProductId,
        int? QtyOnDoc,
        DateTime? BatchDate,
        Guid? OwnerId,
        Guid? FaultId,
        string? DocNo,
        int? QtyReturned,
        bool? resolved,
        string? Comment,
        Guid? UserId,
        DateTime DateUpdated
        );
}
