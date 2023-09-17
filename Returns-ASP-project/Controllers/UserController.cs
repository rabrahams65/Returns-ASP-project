using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
                user.Id,
                user.Email,
                user.FirstName,
                user.LastName
                );

            return Ok(rm);
        }

        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(204)]
        [HttpPut("{id}")]
        public ActionResult Update(Guid id, User user)
        {
            if(id != user.Id)
            {
                return BadRequest();
            }

            _entities.Entry(user).State = EntityState.Modified;

            try
            {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e)
            {
                return Conflict(new { message = $"An unexpected error occurred. Please try again. {e.Message}" });
            }

            return NoContent();
        }

        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(204)]
        [HttpDelete]
        public ActionResult Delete(Guid id)
        {
            var user = _entities.Users.Single( u => u.Id == id);

            if (user == null) return NotFound();

            _entities.Users.Remove(user);

            try
            {
                _entities.SaveChanges();
            }
            catch (Exception e)
            {
                return Conflict(new { message = $"The error of type {e.GetType().Name} occured" });
            }

            return NoContent();
        }

    }
}
