using AspNetCore.Reporting;
using Returns_ASP_project.ReadModels;
using Returns_ASP_project.Services.Interfaces;
using System.Reflection;
using System.Text;

namespace Returns_ASP_project.Services
{
    public class ReportService : IReportService
    {
        public byte[] GenerateReportAsync(string reportName, string reportType, List<ReturnRm> returnList)
        {
            string fileDirPath = Assembly.GetExecutingAssembly().Location.Replace("Returns-ASP-project.dll", string.Empty);
            string rdlcFilePath = string.Format($"{fileDirPath}Reports\\{reportName}.rdlc");

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding.GetEncoding("utf-8");

            LocalReport report = new LocalReport(rdlcFilePath);

            report.AddDataSource("dsReturns", returnList);

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("ReportParameter1", "Returns Register");
            var result = report.Execute(GetRenderType(reportType),1, parameters);

            return result.MainStream;
        }

        private RenderType GetRenderType(string reportType) 
        {
            var renderType = RenderType.Pdf;

            switch (reportType.ToUpper())
            {
                default:
                case "PDF":
                    renderType = RenderType.Pdf;
                    break;
                case "XLS":
                    renderType = RenderType.Excel;  
                    break;
                case "WORD":
                    renderType = RenderType.Word;
                    break;
            }
            return renderType;
        }
    }
}
