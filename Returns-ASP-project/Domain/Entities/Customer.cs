namespace Returns_ASP_project.Domain.Entities
{
    public class Customer
    {
        public Guid Id { get; set; }
        public string? CustomerName { get; set; }
        public string? ShortCode { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }


        public Customer(Guid id, string? customerName, string? shortCode, string? email, string? address)
        {
            Id = id;
            CustomerName = customerName;
            ShortCode = shortCode;
            Email = email;
            Address = address;
        }
    }


}
