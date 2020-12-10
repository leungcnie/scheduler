export function getAppointmentsForDay(state, day) {
  const result = [];
  const dayObj = state.days.filter(obj => obj.name === day)[0]; // Get specific day object
  const appointments = dayObj? [...dayObj.appointments] : []; // Get appointments array if that day exists

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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  return result;
}