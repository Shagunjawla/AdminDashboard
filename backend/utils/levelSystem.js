// utils/levelSystem.js
function calculateLevel(xp) {
    return Math.floor(xp / 100) + 1;
}

function getBadge(level) {
    if (level >= 50) return "Legend";
    if (level >= 30) return "Master";
    if (level >= 20) return "Pro";
    if (level >= 10) return "Intermediate";
    return "Beginner";
}

module.exports = { calculateLevel, getBadge };