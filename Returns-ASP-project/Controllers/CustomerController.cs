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
    public class CustomerController : ControllerBase
    {

        private readonly Entities _entities;

        public CustomerController(Entities entities)
        {
            _entities = entities;
        }

        [ProducesResponseType(typeof(IEnumerable<CustomerRm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet]
        public IEnumerable<CustomerRm> Search()
        {
            var customerList = _entities.Customers.Select(c =>
                new CustomerRm(
                c.Id,
                c.CustomerName!,
                c.ShortCode!,
                c.Email!,
                c.Address!
                ));

            return customerList;
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(CustomerRm), StatusCodes.Status200OK)]
        [HttpGet("{id}")]
        public ActionResult<CustomerRm> Find(Guid id)
        {
            var customer = _entities.Customers.SingleOrDefault(c => c.Id == id);

            if(customer == null)
            {
                return NotFound();
            }

            var customerRm = new CustomerRm(customer.Id, customer.CustomerName!, customer.ShortCode!, customer.Email!, customer.Address!);

            return Ok(customerRm);
        }

        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(typeof(CustomerRm), StatusCodes.Status200OK)]
        //[HttpGet("{name}")]
        //public ActionResult<CustomerRm> FindByName(string name)
        //{
        //    var customer = _entities.Customers.SingleOrDefault(c => c.CustomerName == name);

        //    if (customer == null)
        //    {
        //        return NotFound();
        //    }

        //    var customerRm = new CustomerRm(customer.Id, customer.CustomerName!, customer.ShortCode!, customer.Email!, customer.Address!);

        //    return Ok(customerRm);
        //}

        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(204)]
        [HttpPut("{id}")]
        public ActionResult Update(Guid id, Customer customer)
        {
            if(id != customer.Id)
            {
                return BadRequest();
            }

            _entities.Entry(customer).State = EntityState.Modified;

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
            var customer = _entities.Customers.Single(u => u.Id == id);

            if (customer == null) return NotFound();

            _entities.Customers.Remove(customer);

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
        [ProducesResponseType(typeof(NewCustomerDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(NewCustomerDto), StatusCodes.Status201Created)]
        [HttpPost]
        public IActionResult Create(NewCustomerDto dto)
        {

            var newCustomer = new Customer(Guid.NewGuid(), dto.CustomerName, dto.ShortCode, dto.Email, dto.Address);


            _entities.Customers.Add(newCustomer);

            try
            {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e)
            {
                return Conflict(new { message = "An error occured while trying to create a new customer. Please try again. " + e.Message });
            }

            return CreatedAtAction(nameof(Find), new { id = newCustomer.Id });

        }

    }
}
