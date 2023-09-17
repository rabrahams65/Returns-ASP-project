namespace Returns_ASP_project.Domain.Entities
{
    public class Fault
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        public Fault(Guid id, string name, string? description)
        {
            Id = id;
            Name = name;
            Description = description;
        }
    }
}
