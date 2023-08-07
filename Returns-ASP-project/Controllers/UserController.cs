using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Returns_ASP_project.Dtos;
using Returns_ASP_project.ReadModels;

namespace Returns_ASP_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static IList<NewUserDto> users = new List<NewUserDto>();

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewUserDto dto)
        {
            users.Add(dto);
            return CreatedAtAction(nameof(Find), new { email = dto.Email} );
        }

        [HttpGet("{email}")]
        public ActionResult<UserRm> Find(string email)
        {
            var user = users.FirstOrDefault(u => u.Email == email);

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
