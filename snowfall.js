document.addEventListener("DOMContentLoaded", function () {
    const numSnowflakes = 100;

    for (let i = 0; i < numSnowflakes; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        document.getElementById("snowflakes-container").appendChild(snowflake);
    
        const startPositionX = Math.random() * window.innerWidth;
        const startPositionY = Math.random() * (window.innerHeight * 0.1); // Adjust 0.5 to set the starting height as a percentage of the window height
        const animationDuration = Math.random() * 5 + 5; // between 5 and 10 seconds
        const animationDelay = Math.random() * 5; // between 0 and 5 seconds
    
        snowflake.style.left = startPositionX + "px";
        snowflake.style.top = startPositionY + "px";
        snowflake.style.animationDuration = animationDuration + "s";
        snowflake.style.animationDelay = "-" + animationDelay + "s"; // negative delay to start animations at different times
    }
    
});
