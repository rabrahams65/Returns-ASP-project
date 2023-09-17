using AspNetCore.Reporting;
using Microsoft.AspNetCore.Mvc;
using Returns_ASP_project.Data;
using Returns_ASP_project.ReadModels;
using Returns_ASP_project.Services.Interfaces;
using System.Net.Mime;

namespace Returns_ASP_project.Controllers
{
    public class ReportController : Controller
    {
        //private readonly IWebHostEnvironment _iwebHostEnvironment;
        private readonly Entities _entities;
        private IReportService _reportService; 

        public ReportController(IReportService reportService, Entities entities)
        {
            _reportService= reportService;
            _entities = entities;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("{reportName}/{reportType}")]
        public ActionResult Get(string reportName, string reportType)
        {
            var returnsList = _entities.Returns.Select(r => new ReturnRm(
               r.Id, r.DocDate, r.CustomerId, r.ProductId
                , r.QtyOnDoc, r.BatchDate, r.OwnerId, r.FaultId
                , r.DocNo, r.QtyReturned, r.Resolved, r.Comment, r.UserId, r.DateUpdated
                )).ToList();
            

            var reportFileByteString = _reportService.GenerateReportAsync(reportName, reportType, returnsList);
            return File(reportFileByteString,MediaTypeNames.Application.Octet,getReportName(reportName,reportType));
        }

        private string getReportName(string reportName, string reportType)
        {
            var outputFileName = reportName + DateTime.Now.Date.ToString()+ DateTime.Now.TimeOfDay + ".pdf";

            switch (reportType.ToUpper())
            {
                default:
                case "PDF":
                    outputFileName = reportName + DateTime.Now.Date.ToString() + DateTime.Now.TimeOfDay + ".pdf";
                    break;
                case "XLS":
                    outputFileName = reportName + DateTime.Now.Date.ToString() + DateTime.Now.TimeOfDay + ".xls";
                    break;
                case "WORD":
                    outputFileName = reportName + DateTime.Now.Date.ToString() + DateTime.Now.TimeOfDay + ".doc";
                    break;
            }
            return outputFileName;
        }

        
    }
}
