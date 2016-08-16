namespace TheWorld.Services
{
    using System.Diagnostics;

    public class DebugMailServices : IMailService
    {
        public bool SendMail(string to, string from, string subject, string body)
        {
            Debug.WriteLine($"Sending mail: To: {to}, Subject: {subject}");
            return true;
        }
    }
}