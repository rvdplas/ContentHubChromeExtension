chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        fetch(request.url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: request.jsonData
          })
            .then(response => response.json())
            .then(data => {
              // Handle the response data
              console.log('Response:', data);
            })
            .catch(error => {
              // Handle errors
              console.error('Error:', error);
            });
    }
);
