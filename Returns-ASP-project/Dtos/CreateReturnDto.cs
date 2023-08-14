using System.ComponentModel.DataAnnotations;

namespace Returns_ASP_project.Dtos
{
    public record CreateReturnDto(
        DateTime? DocDate,
        [Required]
        string Customer,
        [Required]
        string Product,
        int QtyOnDoc,
        DateTime? BatchDate,
        string Owner,
        string Fault,
        string DocNo,
        int QtyReturned,
        bool resolved,
        string Comment);

}
