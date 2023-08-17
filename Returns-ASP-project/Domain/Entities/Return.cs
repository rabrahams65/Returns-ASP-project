using Returns_ASP_project.Data;
using Returns_ASP_project.Domain.Errors;
using Returns_ASP_project.Dtos;
using Returns_ASP_project.ReadModels;


namespace Returns_ASP_project.Domain.Entities;

public class Return
{
    public Guid Id { get; set; }
    public DateTime? DocDate { get; set; }
    public string? Customer { get; set; }
    public string? Product { get; set; }
    public int? QtyOnDoc { get; set; }
    public DateTime? BatchDate { get; set; }
    public string? Owner { get; set; }
    public string? Fault { get; set; }
    public string? DocNo { get; set; }
    public int? QtyReturned { get; set; }
    public bool? resolved { get; set; }
    public string? Comment { get; set; }

    public Return()
    {

    }

    public Return(Guid id, DateTime? docDate, string? customer, string? product, int? qtyOnDoc, DateTime? batchDate, string? owner, string? fault, string? docNo, int? qtyReturned, bool? resolved, string? comment)
    {
        Id = id;
        DocDate = docDate;
        Customer = customer;
        Product = product;
        QtyOnDoc = qtyOnDoc;
        BatchDate = batchDate;
        Owner = owner;
        Fault = fault;
        DocNo = docNo;
        QtyReturned = qtyReturned;
        this.resolved = resolved;
        Comment = comment;
    }

}
