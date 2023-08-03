using Microsoft.AspNetCore.Mvc;
using Returns_ASP_project.ReadModels;

namespace Returns_ASP_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReturnController : ControllerBase
    {
       
        private readonly ILogger<ReturnController> _logger;

        private static ReturnRm[] _returns =  new ReturnRm[]
        {
            new (Guid.NewGuid(),
                new DateTime(2022,04,14),
                "Spar",
                "Bread",
                10,
                new DateTime(),
                "John",
                "Mouldy",
                "555555",
                true,
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
                false,
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
                false,
                6,
                false,
                "testing"
                ),
        };

        private readonly ReturnRm[] returns = _returns;

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
    }
}
