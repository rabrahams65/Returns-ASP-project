using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Returns_ASP_project.Data;
using Returns_ASP_project.Domain.Entities;
using Returns_ASP_project.Dtos;
using Returns_ASP_project.ReadModels;

namespace Returns_ASP_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Entities _entities;

        public UserController(Entities entities)
        {
            _entities = entities;
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewUserDto dto)
        {
            _entities.Users.Add( new User(
                Guid.NewGuid(),
                dto.Email,
                dto.FirstName,
                dto.LastName
                ));
            _entities.SaveChanges();

            return CreatedAtAction(nameof(Find), new { email = dto.Email} );
        }

        [HttpGet("{email}")]
        public ActionResult<UserRm> Find(string email)
        {
            var user = _entities.Users.FirstOrDefault(u => u.Email == email);

            if (user == null)
                return NotFound();

            var rm = new UserRm(
                user.Email,
                user.FirstName,
                user.LastName
                );

            return Ok(rm);
        }
    }
}
