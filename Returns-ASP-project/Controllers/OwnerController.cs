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
    public class OwnerController : ControllerBase
    {
        private readonly Entities _entities;

        public OwnerController(Entities entities)
        {
            _entities = entities;
        }


        [ProducesResponseType(typeof(IEnumerable<OwnerRm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet]
        public IEnumerable<OwnerRm> Search()
        {
            var owners = _entities.Owners.Select(o =>
            new OwnerRm(o.Id, o.FirstName, o.LastName));

            return owners;
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(OwnerRm), StatusCodes.Status200OK)]
        [HttpGet("{id}")]
        public ActionResult<OwnerRm> Find(Guid id)
        {
            var owner = _entities.Owners.SingleOrDefault(o => o.Id == id);

            if(owner == null)
            {
                return NotFound();
            }

            var ownerRm = new OwnerRm(owner.Id, owner.FirstName, owner.LastName);

            return Ok(ownerRm);
        }

        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(204)]
        [HttpPut("{id}")]
        public ActionResult Update(Guid id, Owner owner)
        {
            if(id != owner.Id)
            {
                return BadRequest();
            }

            _entities.Entry(owner).State = EntityState.Modified;

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
            var owner = _entities.Owners.Single(u => u.Id == id);

            if (owner == null) return NotFound();

            _entities.Owners.Remove(owner);

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

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(NewOwnerDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(NewOwnerDto), StatusCodes.Status201Created)]
        [HttpPost]
        public ActionResult Create(NewOwnerDto owner)
        {
            var createdOwner = new Owner(Guid.NewGuid(), owner.FirstName, owner.LastName);

            _entities.Owners.Add(createdOwner);

            try
            {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e)
            {
                return Conflict(new { message = "An error occured while trying to create a new return. Please try again. " + e.Message });
            }

            return CreatedAtAction(nameof(Find), new { id = createdOwner.Id });
        }
    }
}
