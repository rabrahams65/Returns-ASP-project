using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Returns_ASP_project.Domain.Entities;

namespace Returns_ASP_project.Data
{
    public class Entities : DbContext
    { 
        public DbSet<User> Users => Set<User>();
        public DbSet<Return> Returns => Set<Return>();
        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Owner> Owners => Set<Owner>();
        public DbSet<Fault> Faults => Set<Fault>();

        public Entities(DbContextOptions<Entities> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Return>().Property(r => r.Id).IsConcurrencyToken();
        }
    }
}
