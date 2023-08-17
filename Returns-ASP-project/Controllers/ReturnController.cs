using Microsoft.AspNetCore.Mvc;
using Returns_ASP_project.ReadModels;
using Returns_ASP_project.Dtos;
using Returns_ASP_project.Domain.Entities;
using System.Linq;
using Returns_ASP_project.Data;
using Returns_ASP_project.Domain.Errors;
using Microsoft.EntityFrameworkCore;

namespace Returns_ASP_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReturnController : ControllerBase
    {
       
        private readonly ILogger<ReturnController> _logger;

        private readonly Entities _entities;

        public ReturnController(ILogger<ReturnController> logger, Entities entities)
        {
            _logger = logger;
            _entities = entities;
        }

        [ProducesResponseType(typeof(IEnumerable<ReturnRm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet]
        public IEnumerable<ReturnRm> Search() 
        {
            var returnsList = _entities.Returns.Select(r => new ReturnRm(
                r.Id, r.DocDate, r.Customer, r.Product
                , r.QtyOnDoc, r.BatchDate, r.Owner, r.Fault
                , r.DocNo, r.QtyReturned, r.resolved, r.Comment
                ));

            return returnsList;

        } 

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ReturnRm),StatusCodes.Status200OK)]
        [HttpGet("{id}")]
        public ActionResult<ReturnRm> Find(Guid id)
        {
            var singleReturn = _entities.Returns.SingleOrDefault(r => r.Id == id);

            if (singleReturn == null)
                return NotFound();

            var readModel = new ReturnRm(singleReturn.Id, singleReturn.DocDate, singleReturn.Customer, singleReturn.Product
                                        ,singleReturn.QtyOnDoc, singleReturn.BatchDate, singleReturn.Owner, singleReturn.Fault
                                        ,singleReturn.DocNo, singleReturn.QtyReturned, singleReturn.resolved, singleReturn.Comment);

            return Ok(readModel);
        }


        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ReturnRm), StatusCodes.Status200OK)]
        [HttpPost]
        public IActionResult CreateReturn(ReturnDto dto)
        {

            var newReturn = new Return(Guid.NewGuid(), dto.DocDate, dto.Customer, dto.Product, dto.QtyOnDoc, dto.BatchDate, dto.Owner
                                       , dto.Fault, dto.DocNo, dto.QtyReturned, dto.resolved, dto.Comment);
 

            _entities.Returns.Add(newReturn);

            try
            {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e)
            {
                return Conflict(new { message = "An error occured while trying to create a new return. Please try again." });
            }

            return CreatedAtAction(nameof(Find), new { id = newReturn.Id });
  
        }

        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(204)]
        [HttpDelete]
        public ActionResult DeleteReturn(ReturnDto dto)
        {
            var returnToDelete = _entities.Returns.SingleOrDefault( r => r.Id == dto.Id);

            if( returnToDelete == null)
            {
                return NotFound();
            }

            _entities.Returns.Remove(returnToDelete);
            _entities.SaveChanges();
            return NoContent();

            throw new Exception($"The error of type {new Exception().GetType().Name} occured. Please try again."); //Check if this works...


        }

            
    }
}