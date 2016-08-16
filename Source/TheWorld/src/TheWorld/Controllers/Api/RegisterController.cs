namespace TheWorld.Controllers.Api
{
    using AutoMapper;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Net;
    using System.Threading.Tasks;
    using TheWorld.Models;
    using TheWorld.ViewModels;

    [Route("api/register")]
    public class RegisterController : Controller
    {
        private ILogger<RegisterController> _logger;
        private IWorldRepository _repository;
        private UserManager<WorldUser> _userManager;

        public RegisterController(IWorldRepository repository,
            UserManager<WorldUser> userManager,
            ILogger<RegisterController> logger)
        {
            _repository = repository;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost("")]
        public async Task<JsonResult> Post([FromBody]RegisterViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newUser = Mapper.Map<Register>(vm);

                    var newWorldUser = new WorldUser()
                    {
                        UserName = newUser.Username,
                        Email = newUser.Email
                    };

                    var result = await _userManager.CreateAsync(newWorldUser, newUser.Password);

                    if (result.Succeeded)
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json("New user successfully created!");
                    }
                    else
                    {
                        Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        return Json(result.Errors);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save data.", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Failed to save new user");
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Validation failed on new user creation");
        }
    }
}