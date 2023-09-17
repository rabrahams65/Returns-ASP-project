namespace ReportModel
{
    public class ReportReturnRm
    {
        public Guid Id { get; set; }
        public DateTime DocDate { get; set; }
        public string Customer { get; set; }
        public string Product { get; set; }
        public int QtyOnDoc { get; set; }
        public DateTime BatchDate { get; set; }
        public string Owner { get; set; }
        public string Fault { get; set; }
        public string DocNo { get; set; }
        public int QtyReturned { get; set; }
        public bool resolved { get; set; }
        public string Comment { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}