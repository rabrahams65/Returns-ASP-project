namespace Returns_ASP_project.ReadModels
{
    public record ReturnRm(
        Guid Id,
        DateTime DocDate,
        string Customer,
        string Product,
        int QtyOnDoc,
        string BatchDate,
        string Owner,
        string Fault,
        string DocNo,
        bool NoBatchDate,
        int QtyReturned
        );
}
