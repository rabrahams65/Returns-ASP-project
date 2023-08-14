using Microsoft.AspNetCore.Mvc;
using Returns_ASP_project.ReadModels;
using Returns_ASP_project.Dtos;

namespace Returns_ASP_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReturnController : ControllerBase
    {
       
        private readonly ILogger<ReturnController> _logger;

        private static List<ReturnRm> _returns =  new List<ReturnRm>
        {
            new (Guid.NewGuid(),
                new DateTime(2022,04,14),
                "Spar",
                "Bread",
                10,
                null,
                "John",
                "Mouldy",
                "555555",
                16,
                true,
                ""
                ),
            new ( Guid.NewGuid(),
                new DateTime(2022,08,25),
                "Checkers",
                "Milk",
                35,
                new DateTime(2022, 09, 19),
                "Mary",
                "Sour",
                "333333",
                35,
                false,
                "testing"
                ),
            new ( Guid.NewGuid(),
                new DateTime(2022,12,31),
                "Woolworths",
                "Eggs",
                12,
                new DateTime(2023, 01, 01),
                "Paul",
                "Expired",
                "888888",
                6,
                false,
                "testing"
                ),
        };

        private readonly List<ReturnRm> returns = _returns;

        public ReturnController(ILogger<ReturnController> logger)
        {
            _logger = logger;
        }

        [ProducesResponseType(typeof(IEnumerable<ReturnRm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet]
        public IEnumerable<ReturnRm> Search() => returns;

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ReturnRm),StatusCodes.Status200OK)]
        [HttpGet("{id}")]
        public ActionResult<ReturnRm> Find(Guid id)
        {
            var singleReturn = returns.SingleOrDefault(r => r.Id == id);

            if (singleReturn == null)
                return NotFound();

            return Ok(singleReturn);
        }


        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ReturnRm), StatusCodes.Status200OK)]
        [HttpPost]
        public IActionResult CreateReturn(CreateReturnDto dto)
        {
     
            var readModel = new ReturnRm(Guid.NewGuid(), dto.DocDate, dto.Customer, dto.Product, dto.QtyOnDoc, dto.BatchDate, dto.Owner, dto.Fault, dto.DocNo, dto.QtyReturned, dto.resolved, dto.Comment);
            _returns.Add(readModel);

            return CreatedAtAction(nameof(Find), new { id = readModel.Id });
  
        }

            
    }
}