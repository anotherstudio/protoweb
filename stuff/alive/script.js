// Script file: script.js

// Physics engine setup
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Events = Matter.Events;

var engine = Engine.create({
  gravity: { x: 0, y: 1, scale: 0.001 },
});

var render = Render.create({
  element: document.getElementById("hourglassCanvas"),
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "transparent",
  },
});

// Create transparent boundaries
var boundaries = [
  Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight,
    window.innerWidth,
    40,
    {
      isStatic: true,
      render: { fillStyle: "transparent", strokeStyle: "transparent" },
    }
  ),
  Bodies.rectangle(0, window.innerHeight / 2, 40, window.innerHeight, {
    isStatic: true,
    render: { fillStyle: "transparent", strokeStyle: "transparent" },
  }),
  Bodies.rectangle(
    window.innerWidth,
    window.innerHeight / 2,
    40,
    window.innerHeight,
    {
      isStatic: true,
      render: { fillStyle: "transparent", strokeStyle: "transparent" },
    }
  ),
  Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 40, {
    isStatic: true,
    render: { fillStyle: "transparent", strokeStyle: "transparent" },
  }),
];

World.add(engine.world, boundaries);

// Sand particle management
var particles = [];
var maxParticles = 1000;
var mouse = { x: 0, y: 0 };

document.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

setInterval(function () {
  if (particles.length >= maxParticles) {
    Matter.World.remove(engine.world, particles.shift());
  }
  var particle = Bodies.circle(window.innerWidth - 32, 10, 5, {
    restitution: 0.6,
    density: 0.001,
    render: { fillStyle: "#ffffff" },
  });
  World.add(engine.world, particle);
  particles.push(particle);
}, 1000);

Events.on(engine, "beforeUpdate", function () {
  particles.forEach(function (particle) {
    var dx = particle.position.x - mouse.x;
    var dy = particle.position.y - mouse.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= particle.circleRadius + 1) {
      var forceMagnitude = 0.01 * particle.mass;
      Matter.Body.applyForce(particle, particle.position, {
        x: forceMagnitude * dx,
        y: forceMagnitude * dy,
      });
    }
  });
});

Engine.run(engine);
Render.run(render);

// Resize handler to adjust canvas and walls
window.addEventListener("resize", function () {
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
  boundaries.forEach(function (boundary) {
    Matter.Body.setPosition(boundary, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  });
});

// Display the modal dialog on page load
window.onload = function () {
  document.getElementById("myModal").style.display = "block";
};

function submitBirthday() {
  var birthdate = document.getElementById("birthdateInput").value;
  if (birthdate) {
    document.getElementById("myModal").style.display = "none";
    updateAgeStopwatch(new Date(birthdate)); // Now calling the function with the user's birthday
    setInterval(function () {
      updateAgeStopwatch(new Date(birthdate));
    }, 1000);
  } else {
    alert("Please enter a valid birthdate.");
  }
}

function updateAgeStopwatch(birthdate) {
  const currentDate = new Date();
  const timeDifference = currentDate - birthdate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.436875);
  const years = Math.floor(days / 365.25);

  document.getElementById("years").querySelector(".number").textContent =
    String(years).padStart(2, "0");
  document.getElementById("months").querySelector(".number").textContent =
    String(months % 12).padStart(2, "0");
  document.getElementById("days").querySelector(".number").textContent = String(
    (days % 30.436875).toFixed(0)
  ).padStart(2, "0");
  document.getElementById("hours").querySelector(".number").textContent =
    String(hours % 24).padStart(2, "0");
  document.getElementById("minutes").querySelector(".number").textContent =
    String(minutes % 60).padStart(2, "0");
  document.getElementById("seconds").querySelector(".number").textContent =
    String(seconds % 60).padStart(2, "0");

  document.getElementById("timeDifferenceYears").textContent = years.toFixed(0);
  document.getElementById("timeDifferenceMonths").textContent =
    months.toFixed(0);
  document.getElementById("timeDifferenceDays").textContent = days.toFixed(0);
  document.getElementById("timeDifferenceHours").textContent = hours.toFixed(0);
  document.getElementById("timeDifferenceMinutes").textContent =
    minutes.toFixed(0);
  document.getElementById("timeDifferenceSeconds").textContent =
    seconds.toFixed(0);
}
