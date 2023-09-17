using Returns_ASP_project.ReadModels;

namespace Returns_ASP_project.Services.Interfaces
{
    public interface IReportService
    {
        byte[] GenerateReportAsync(string reportName, string reportType, List<ReturnRm> returnList);
    }
}
