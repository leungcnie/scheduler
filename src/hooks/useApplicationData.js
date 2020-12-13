import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // Return new days array with updated spots
  const updateSpots = (dayName, days, appointments) => {
    const index = days.findIndex(d => d.name === dayName); // Get index of current day
    const apptIDs = days[index].appointments; // Get array of appointment IDs
    let freeSpots = 0;

    // Loop through appointments, and if the interview value is null, add a free spot
    for (const id of apptIDs) {
      if (appointments[id].interview === null) {
        freeSpots++;
      }
    }
    // Assign the new spots value to the day
    days[index].spots = freeSpots;

    return days;
  }

  // Fetch days data from scheduler-api
  useEffect(() => {
    Promise.all([
      axios.get("/api/days").then((res) => res.data),
      axios.get("/api/appointments").then((res) => res.data),
      axios.get("/api/interviewers").then((res) => res.data),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0],
        appointments: all[1],
        interviewers: all[2],
      }));
    });
  }, []);

  // Saving an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.day, [...state.days], appointments);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  // Deleting an interview
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.day, [...state.days], appointments);

    return axios.delete(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
