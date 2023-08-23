using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Returns_ASP_project.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }



        public User(Guid id, string email, string firstName, string lastName)
        {
            Id = id;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
        }
    }
   
}
