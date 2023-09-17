using Returns_ASP_project.Data;
using Returns_ASP_project.Domain.Errors;
using Returns_ASP_project.Dtos;
using Returns_ASP_project.ReadModels;


namespace Returns_ASP_project.Domain.Entities;

public class Return
{
    public Guid Id { get; set; }
    public DateTime? DocDate { get; set; }
    public Guid? CustomerId { get; set; }
    public Customer? Customer { get; set; }
    public Guid? ProductId { get; set; }
    public Product? Product { get; set; }
    public int? QtyOnDoc { get; set; }
    public DateTime? BatchDate { get; set; }
    public Guid? OwnerId { get; set; }
    public Owner? Owner { get; set; }
    public Guid? FaultId { get; set; }
    public Fault? Fault { get; set; }
    public string? DocNo { get; set; }
    public int? QtyReturned { get; set; }
    public bool? Resolved { get; set; }
    public string? Comment { get; set; }
    public Guid? UserId { get; set; }
    public User? User { get; set; }
    public DateTime? DateAdded { get; set; }
    public DateTime DateUpdated { get; set; }

    public Return()
    {

    }

    public Return(Guid id, DateTime? docDate, Guid? customerId, Guid? productId, int? qtyOnDoc, DateTime? batchDate, 
        Guid? ownerId, Guid? faultId, string? docNo, int? qtyReturned, bool? resolved, string? comment, Guid? userId, DateTime dateUpdated)
    {
        Id = id;
        DocDate = docDate;
        CustomerId = customerId;
        ProductId = productId;
        QtyOnDoc = qtyOnDoc;
        BatchDate = batchDate;
        OwnerId = ownerId;
        FaultId = faultId;
        DocNo = docNo;
        QtyReturned = qtyReturned;
        Resolved = resolved;
        Comment = comment;
        UserId = userId;
        DateUpdated = dateUpdated;
    }

    public bool DateAddedAlreadyInDb(Guid returnId)
    {
        if (returnId == Id && DateAdded != null)
        {
            return true;
        }

        DateAdded = DateTime.Now;

        return false;
    }
}
