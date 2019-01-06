const hoursButton = document.querySelector('.hoursButton');
const openingHour = 8;
const closingHour = 17;

function changeHoursButton() {
    //TO-DO: Change this to check specifically the MTN time zone so you can
    // check the hours no matter where you
    const currDate = new Date();
    const day = currDate.getDay();
    const hour = currDate.getHours();

    if(!isOpen()) {
       hoursButton.classList.remove('open');
       hoursButton.classList.add('closed');
       hoursButton.textContent = "Sorry, we're closed!";
    }

    function isOpen() {
        if ((day > 0 && day < 6) && (hour >= openingHour && hour < closingHour)) {
            return true;
        } else {
            return false;
        }
    }
}


changeHoursButton();