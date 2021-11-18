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

export const postEventData = async (eventData) => {
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
