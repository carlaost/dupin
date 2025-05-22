// Fetch and display history
function displayHistory() {
    const historyList = document.getElementById('history');

    chrome.storage.local.get({ history: {} }, function(result) {
        const historyObj = result.history;
        // Convert object to array for sorting and display
        const history = Object.values(historyObj);

        console.log('history:', history);

        // Clear the list
        historyList.innerHTML = '';

        // Sort history by timestamp, most recent first
        history.sort((a, b) => new Date(b.last_seen_on) - new Date(a.last_seen_on));

        // Populate the list with history items
        history.forEach(function(entry) {
            const listItem = document.createElement('div');
            listItem.className = 'history-item';

            const title = document.createElement('h3');
            title.textContent = entry.title;
            listItem.appendChild(title);

            const metadata = document.createElement('div');
            metadata.className = 'metadata';
            
            // Format date if it exists
            const date = entry.year ? new Date(entry.year).toLocaleDateString() : 'No date';
            
            metadata.innerHTML = `
                <p><strong>DOI:</strong> ${entry.doi || 'No DOI'}</p>
                <p><strong>Publication Date:</strong> ${date}</p>
                <p><strong>Authors:</strong> ${entry.author}</p>
                <p><strong>Last viewed:</strong> ${new Date(entry.last_seen_on).toLocaleString()}</p>
                <p><strong>Times viewed:</strong> ${entry.times_seen}</p>
            `;

            listItem.appendChild(metadata);
            historyList.appendChild(listItem);
        });

        // Show message if history is empty
        if (history.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'No articles viewed yet';
            emptyMessage.className = 'empty-message';
            historyList.appendChild(emptyMessage);
        }
    });
}

displayHistory();