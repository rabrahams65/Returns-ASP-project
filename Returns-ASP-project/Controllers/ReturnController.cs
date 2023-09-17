using Microsoft.AspNetCore.Mvc;
using Returns_ASP_project.ReadModels;
using Returns_ASP_project.Dtos;
using Returns_ASP_project.Domain.Entities;
using System.Linq;
using Returns_ASP_project.Data;
using Returns_ASP_project.Domain.Errors;
using Microsoft.EntityFrameworkCore;
using Returns_ASP_project.Common;
using Humanizer;

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

        [ProducesResponseType(typeof(IQueryable<ReturnRm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet]
        public IQueryable<ReturnRm> Search([FromQuery] QueryParameters qp) 
        {
            IQueryable<ReturnRm> returnsList = _entities.Returns.Select(r => new ReturnRm(
                r.Id, r.DocDate, r.CustomerId, r.ProductId
                , r.QtyOnDoc, r.BatchDate, r.OwnerId, r.FaultId
                , r.DocNo, r.QtyReturned, r.Resolved, r.Comment, r.UserId, r.DateUpdated
                ));

            returnsList = qp.Size > 0 ? returnsList.Skip(qp.Size * (qp.Page - 1)).Take(qp.Size) : returnsList;

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

            var readModel = new ReturnRm(singleReturn.Id, singleReturn.DocDate, singleReturn.CustomerId, singleReturn.ProductId
                                        , singleReturn.QtyOnDoc, singleReturn.BatchDate, singleReturn.OwnerId, singleReturn.FaultId
                                        , singleReturn.DocNo, singleReturn.QtyReturned, singleReturn.Resolved, singleReturn.Comment, singleReturn.UserId, singleReturn.DateUpdated);

            return Ok(readModel);
        }


        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ReturnRm), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ReturnRm), StatusCodes.Status201Created)]
        [HttpPost]
        public IActionResult CreateReturn(ReturnDto dto)
        {

            var newReturn = new Return(Guid.NewGuid(), dto.DocDate, dto.CustomerId, dto.ProductId, dto.QtyOnDoc, dto.BatchDate, dto.OwnerId
                                       , dto.FaultId, dto.DocNo, dto.QtyReturned, dto.resolved, dto.Comment, dto.UserId, DateTime.Now);


            newReturn.DateAdded = newReturn.DateUpdated;

            _entities.Returns.Add(newReturn);

            try
            {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e)
            {
                return Conflict(new { message = "An error occured while trying to create a new return. Please try again. " + e.Message });
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

        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(204)]
        [HttpPut("{id}")]
        public ActionResult UpdateReturn(Guid id, ReturnRm rm)
        {
            var returnInDb = _entities.Returns.Single( r => r.Id == id);
            var DateAdded = returnInDb.DateAdded;

            var singleReturn = new Return(rm.Id, rm.DocDate, rm.CustomerId, rm.ProductId, rm.QtyOnDoc, rm.BatchDate, rm.OwnerId
            , rm.FaultId, rm.DocNo, rm.QtyReturned, rm.resolved, rm.Comment, rm.UserId, DateTime.Now);

            

            if (id != singleReturn.Id)
            {
                return BadRequest();
            }

            if(singleReturn.DateAdded == null)
            {
                
                singleReturn.DateAdded = DateAdded;
                _entities.Entry(returnInDb).State = EntityState.Detached;
            }

             _entities.Entry(singleReturn).State= EntityState.Modified;
            
            try
            {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e)
            {
                return Conflict(new { message = "An error occured while trying to edit the return. Please try again. " + e.Message });
            }
            return NoContent();
        }
            
    }
}