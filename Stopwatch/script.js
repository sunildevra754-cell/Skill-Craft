// Variables
let startTime = 0;        // Jab start button press hua
let elapsedTime = 0;      // Kitna time pass hua
let timerInterval = null; // Interval ko store karne ke liye
let isRunning = false;    // Timer chal raha hai ya nahi
let lapTimes = [];        // Sab laps store karte hain yahan
// DOM Elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
// ============================================
// HELPER FUNCTION - Time ko format karna
// ============================================
function formatTime(ms) {
    // Milliseconds ko seconds mein convert
    const totalSeconds = Math.floor(ms / 1000);
    
    // Minutes nikalna
    const minutes = Math.floor(totalSeconds / 60);
    
    // Remaining seconds nikalna
    const seconds = totalSeconds % 60;
    
    // Milliseconds nikalna (sirf last 2 digits)
    const milliseconds = Math.floor((ms % 1000) / 10);
    // Format: MM:SS.MS
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}
// Example: 5 milliseconds = "00:00:05"
// Example: 65000 ms (65 seconds) = "01:05.00"
// ============================================
// Display ko update karna
// ============================================
function updateDisplay() {
    // Current time = ab ka time - start time + jo time pause tha
    const currentTime = Date.now() - startTime + elapsedTime;
    display.textContent = formatTime(currentTime);
}
// ============================================
// START BUTTON
// ============================================
startBtn.addEventListener('click', function() {
    if (!isRunning) {  // Agar abhi running nahi hai
        startTime = Date.now();  // Current timestamp store karo
        isRunning = true;
        
        // Button states update karo
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
        // Her 10ms mein display update karo
        timerInterval = setInterval(updateDisplay, 10);
    }
});
// ============================================
// PAUSE BUTTON
// ============================================
pauseBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timerInterval);  // Timer roko
        
        // Elapsed time update karo taaki pause state remember rahe
        elapsedTime += Date.now() - startTime;
        
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
});
// ============================================
// RESET BUTTON
// ============================================
resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);  // Timer roko
    
    // Sab variables reset karo
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapTimes = [];
    
    display.textContent = formatTime(0);  // Display reset
    
    // Button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    
    // Laps list clear karo
    lapsList.innerHTML = '<div class="no-laps">No laps recorded yet</div>';
});
// ============================================
// LAP BUTTON
// ============================================
lapBtn.addEventListener('click', function() {
    if (isRunning) {
        // Current total time
        const currentTime = Date.now() - startTime + elapsedTime;
        
        // Lap time = current time - previous lap time
        const lapTime = currentTime - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].time : 0);
        
        // Lap object banao aur store karo
        lapTimes.push({ time: currentTime, lapTime: lapTime });
        
        // Agar pehla lap hai to "no laps" message hatao
        if (lapsList.querySelector('.no-laps')) {
            lapsList.innerHTML = '';
        }
        // Lap item create karo
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapTimes.length}</span>
            <span class="lap-time">${formatTime(lapTime)}</span>
        `;
        
        // List ke sab se upar add karo (latest lap sabse upar)
        lapsList.insertBefore(lapItem, lapsList.firstChild);
    }
});
/*
  Documentation and usage notes removed from runtime to avoid
  syntax errors. If you need the developer notes, keep them in
  a separate README.md or wrap them in block comments as done
  here.

  Quick run notes:
  - Open QuizApp/index.html in a browser.
  - Elements expected: #display, #startBtn, #pauseBtn, #resetBtn, #lapBtn, #lapsList
  - Start/Pause/Reset/Lap controls operate the stopwatch.
*/
 