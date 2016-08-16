namespace TheWorld.Models
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using System;

    public class WorldUser : IdentityUser
    {
        public DateTime FirstTrip { get; set; }
    }
}