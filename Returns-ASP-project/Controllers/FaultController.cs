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
    public class FaultController : ControllerBase
    {
        private readonly Entities _entities;

        public FaultController(Entities entities)
        {
            _entities = entities;
        }


        [ProducesResponseType(typeof(IEnumerable<FaultRm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet]
        public IEnumerable<FaultRm> Search()
        {
            var faults = _entities.Faults.Select(f =>
            new FaultRm(f.Id, f.Name, f.Description!));

            return faults;
        }


        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(FaultRm), StatusCodes.Status200OK)]
        [HttpGet("{id}")]
        public ActionResult<FaultRm> Find(Guid id)
        {
            var fault = _entities.Faults.SingleOrDefault(f => f.Id == id);

            if(fault == null)
            {
                NotFound();
            }

            var faultRm = new FaultRm(fault.Id, fault.Name, fault.Description!);

            return Ok(faultRm);
        }

        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(204)]
        [HttpPut("{id}")]
        public ActionResult Update(Guid id, Fault fault)
        {
            if(id != fault.Id)
            {
                return BadRequest();
            }

            _entities.Entry(fault).State = EntityState.Modified;

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
            var fault = _entities.Faults.Single(u => u.Id == id);

            if (fault == null) return NotFound();

            _entities.Faults.Remove(fault);

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
        [ProducesResponseType(typeof(NewFaultDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(NewFaultDto), StatusCodes.Status201Created)]
        [HttpPost]
        public ActionResult Create(NewFaultDto fault)
        {
            var createdFault = new Fault(Guid.NewGuid(), fault.Name, fault.Description);

            _entities.Faults.Add(createdFault);

            try
            {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e)
            {
                return Conflict(new { message = "An error occured while trying to create a new return. Please try again. " + e.Message });
            }

            return CreatedAtAction(nameof(Find), new { id = createdFault.Id });
        }
    }
}
