var city = 'Toronto'
var country = 'Canada'

function citycountry(cityReq, countryReq) {
    city = cityReq
    country = countryReq
    const method = 2; // Prayer calculation method in North America choose 2 for ISNA 

    const url = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const prayerTimes = data.data;
            displayPrayerTimes(prayerTimes);
        })
        .catch(error => console.error(error));
}


function displayPrayerTimes(prayerTimes) {
    const prayerTimesDiv = document.getElementById('prayer-times');
    const convertedPrayerTimes = {
        Fajr: convertTo12HourClock(prayerTimes.timings.Fajr),
        Sunrise: convertTo12HourClock(prayerTimes.timings.Sunrise),
        Dhuhr: convertTo12HourClock(prayerTimes.timings.Dhuhr),
        Asr: convertTo12HourClock(prayerTimes.timings.Asr),
        Maghrib: convertTo12HourClock(prayerTimes.timings.Maghrib),
        Isha: convertTo12HourClock(prayerTimes.timings.Isha)
    };
    prayerTimesDiv.innerHTML = `
        <h2>Prayer Times for ${city} <br> ${prayerTimes.date.readable}</h2>
        <p>Fajr: ${convertedPrayerTimes.Fajr}</p>
        <p>Sunrise: ${convertedPrayerTimes.Sunrise}</p>
        <p>Dhuhr: ${convertedPrayerTimes.Dhuhr}</p>
        <p>Asr: ${convertedPrayerTimes.Asr}</p>
        <p>Maghrib: ${convertedPrayerTimes.Maghrib}</p>
        <p>Isha: ${convertedPrayerTimes.Isha}</p>
    `;
}

function convertTo12HourClock(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = (hour % 12) || 12;
    const time12 = `${hour12}:${minutes} ${period}`;
    return time12;
}