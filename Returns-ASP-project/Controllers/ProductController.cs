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
    public class ProductController : ControllerBase
    {
        private readonly Entities _entities;

        public ProductController(Entities entites)
        {
            _entities = entites;
        }

        [ProducesResponseType(typeof(IEnumerable<ProductRm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet]
        public IEnumerable<ProductRm> Search() 
        {
            IEnumerable<ProductRm> productList = _entities.Products.Select(p =>
            new ProductRm(
                p.Id,
                p.ProductName!,
                p.ShortCode!,
                p.Price,
                p.Weight
            ));

            return productList;
        }


        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ProductRm), StatusCodes.Status200OK)]
        [HttpGet("{id}")]
        public ActionResult<ProductRm> Find(Guid id)
        {
            var product = _entities.Products.SingleOrDefault(p => p.Id == id);

            if(product == null)
            {
                return NotFound();
            }

            var productRm = new ProductRm(product.Id,product.ProductName!, product.ShortCode!, product.Price, product.Weight);

            return Ok(productRm);
        }

        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(204)]
        [HttpPut("{id}")]
        public ActionResult Update(Guid id, Product product)
        {
            if(id != product.Id) 
            {
                return BadRequest();
            }

            _entities.Entry<Product>(product).State = EntityState.Modified;

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
            var product = _entities.Products.Single(u => u.Id == id);

            if (product == null) return NotFound();

            _entities.Products.Remove(product);

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
        [ProducesResponseType(typeof(NewProductDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(NewProductDto), StatusCodes.Status201Created)]
        [HttpPost]
        public IActionResult Create(NewProductDto product)
        {
            var createdProduct = new Product(Guid.NewGuid(), product.ProductName, product.ShortCode, product.Price, product.Weight);

            _entities.Products.Add(createdProduct);

            try
            {
                _entities.SaveChanges();
            }
            catch (Exception e)
            {
                return Conflict(new { message = "An error occured while trying to create a new return. Please try again. " + e.Message});
            }

            return CreatedAtAction(nameof(Find), new { id = createdProduct.Id });
        }

    }
}
