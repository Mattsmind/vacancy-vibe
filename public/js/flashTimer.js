document.addEventListener('DOMContentLoaded', () => {
    const flashMessages = document.querySelectorAll('.custom-flash');

    flashMessages.forEach((message) => {
        setTimeout(() => {
            const alert = bootstrap.Alert.getOrCreateInstance(message);
            alert.close();
        }, 5000)
    });
});