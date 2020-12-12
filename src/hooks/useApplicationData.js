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

  // Return new days array to show remaining spots
  const newDays = (status) => {
    const dayObj = state.days.find((day) => day.name === state.day);
    const dayIndex = state.days.indexOf(dayObj);

    console.log("dayIndex", dayIndex)
    
    const days = [...state.days]
    if (status === "add") {
      days[dayIndex].spots--;
    } else if (status === "delete"){
      days[dayIndex].spots++;
    }
    
    console.log("DAYS", days);
    
    return days;
  };

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

    const days = newDays("add");

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
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = newDays("delete");

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
