export function getAppointmentsForDay(state, day) {
  const result = [];
  // Get specific day object
  const dayObj = state.days.filter(obj => obj.name === day)[0];
  // Get appointments array if that day exists
  const appointments = dayObj? [...dayObj.appointments] : [];

  // If there are no appointments or the day doesn't exist, return an empty array
  if (appointments.length === 0) {
    return [];
  }

  for (const id of appointments) {
    if (state.appointments[id]) {
      result.push(state.appointments[id]);
    }
  }

  return result;
}