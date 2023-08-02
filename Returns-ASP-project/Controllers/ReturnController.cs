using Microsoft.AspNetCore.Mvc;
using Returns_ASP_project.ReadModels;

namespace Returns_ASP_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReturnController : ControllerBase
    {
       
        private readonly ILogger<ReturnController> _logger;

        public ReturnController(ILogger<ReturnController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<ReturnRm> Search() => new ReturnRm[] 
            {
             new ( Guid.NewGuid(),
                    new DateTime(2022,04,14),
                   "Spar",   
                   "Bread",
                   10,
                   "No Date",
                   "John",
                   "Mouldy",
                   "555555",
                   true,
                   16
                   ),
             new ( Guid.NewGuid(),
                    new DateTime(2022,08,25),
                   "Checkers",
                   "Milk",
                   35,
                   "19/09/2022",
                   "Mary",
                   "Sour",
                   "333333",
                   false,
                   35
                   ),
             new ( Guid.NewGuid(),
                    new DateTime(2022,12,31),
                   "Woolworths",
                   "Eggs",
                   12,
                   "01/01/2023",
                   "Paul",
                   "Expired",
                   "888888",
                   false,
                   6
                   ),
            };
    }
}
