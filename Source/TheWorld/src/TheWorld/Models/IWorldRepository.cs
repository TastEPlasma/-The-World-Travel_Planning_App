﻿using System.Collections.Generic;

namespace TheWorld.Models
{

    public interface IWorldRepository
    {
        IEnumerable<Trip> GetAllTrips();

        IEnumerable<Trip> GetAllTripsWithStops();

        void AddTrip(Trip newTrip);

        bool SaveAll();

        Trip GetTripByName(string tripName, string userName);

        void AddStop(string tripName, string userName, Stop newStop);

        IEnumerable<Trip> GetUserTripsWithStops(string name);

        bool DeleteTripById(int tripId);

        bool DeleteStopById(int v);
    }
}