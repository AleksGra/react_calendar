const baseUrl = 'https://6149a35007549f001755a4b0.mockapi.io/api/v1/calendar';

export async function fetchEvents() {
  try {
    const response = await fetch(baseUrl);
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    alert("Internal Server Error. Can't display events");
  }
}

export const eventData = async (eventData) => {
  try {
    return fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
  } catch (e) {
    alert("Internal Server Error. Can't display events");
  }
};

export const deleteEvent = async (taskId) => {
  try {
    return fetch(`${baseUrl}/${taskId}`, {
      method: 'DELETE',
    });
  } catch (e) {
    alert("Internal Server Error. Can't display events");
  }
};

export function createEvent(event) {
  event.preventDefault();
  const fieldEl = [...document.querySelectorAll('.event-form__field')].map(
    (el) => el.value
  );
  const [title, date, startTime, endTime, description] = fieldEl;

  return postEvent({
    title,
    description,
    dateFrom: new Date(`${date} ${startTime}`),
    dateTo: new Date(`${date} ${endTime}`),
  });
}
