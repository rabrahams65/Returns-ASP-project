namespace Returns_ASP_project.Domain.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public string? ProductName { get; set; }
        public string? ShortCode { get; set; }
        public decimal Price { get; set; }
        public decimal Weight { get; set; }

        public Product(Guid id, string productName, string shortCode, decimal price, decimal weight )
        {
            Id = id;
            ProductName = productName;
            ShortCode = shortCode;
            Price = price;
            Weight = weight;
        }
       
    }
}
