const CollegeProgramsInfo = [
  {
    name: "College of Arts Social, & Management Sciences",
    programmes: [
      {
        program: "PGD",
        duration: "minimum of one academic session",
        requirement: "First degree (minimum 3rd class - CGPA 1.50/5.0) in relevant discipline",
        listOfPrograms: [
          "PGD in Accounting",
          "PGD in Islamic Studies",
          "PGD in Political Science",
          "PGD in Business Administration",
          "PGD in Mass Communication",
        ],
      },
      {
        program: "Masters",
        duration: "minimum of 18 months",
        requirement:
          "First degree (minimum 2nd class lower - CGPA 2.40/5.0) in relevant discipline",
        listOfPrograms: [
          "M.Sc in Accounting",
          "M.Sc in Islamic Studies",
          "M.Sc in Political Science",
          "M.Sc in Business Administration",
          "M.Sc in Mass Communication",
          "M.Sc in Economics",
        ],
      },
      {
        program: "MPhil/PhD",
        duration: "minimum of 4 academic sessions",
        requirement: "Academic Masters with research dissertation and minimum of 55-59% or CGPA of 3.5/5.0",
        listOfPrograms: [
          "MPhil/PhD in Accounting",
          "MPhil/PhD in Business Administration",
          "MPhil/PhD in Mass Communication",
        ],
      },
      {
        program: "PhD",
        duration: "minimum of 3 academic sessions",
        requirement: "Academic Masters with research dissertation and minimum of 60% or CGPA of 4.0/5.0",
        listOfPrograms: [
          "PhD in Accounting",
          "PhD in Business Administration",
          "PhD in Mass Communication",
        ],
      },
    ],
  },
  {
    name: "College Of Information & Communication Technology",
    programmes: [
      {
        program: "PGD",
        duration: "minimum of one academic session",
        requirement: "First degree (minimum 3rd class - CGPA 1.50/5.0) in relevant discipline",
        listOfPrograms: ["PGD in Computer Science"],
      },
      {
        program: "Masters",
        duration: "minimum of 18 months",
        requirement:
          "First degree (minimum 2nd class lower - CGPA 2.40/5.0) in relevant discipline",
        listOfPrograms: ["M.Sc. in Computer Science"],
      },
      {
        program: "MPhil/PhD",
        duration: "minimum of four academic session",
        requirement:  "Academic Masters with research dissertation and minimum of 55-59% or CGPA of 3.5/5.0",
        listOfPrograms: ["MPhil/PhD in Computer Science"],
      },
      {
        program: "PhD",
        duration: "minimum of three academic session",
        requirement: "Academic Masters with research dissertation and minimum of 60% or CGPA of 4.0/5.0",
        listOfPrograms: ["PhD in Computer Science"],
      },
    ],
  },
  {
    name: "College Of Environmental Sciences",
    programmes: [
      {
        program: "PGD",
        duration: "minimum of one academic session",
        requirement: "First degree (minimum 3rd class - CGPA 1.50/5.0) in relevant discipline",
        listOfPrograms: "",
      },
      {
        program: "Masters",
        duration: "2 years",
        requirement:
          "First degree (minimum 2nd class lower - CGPA 2.40/5.0) in relevant discipline",
        listOfPrograms: ["M.Sc. in Architecture"],
      },
      {
        program: "MPhil/PhD",
        duration: "3-5 years",
        requirement:  "Academic Masters with research dissertation and minimum of 55-59% or CGPA of 3.5/5.0",
        listOfPrograms: "",
      },
      {
        program: "PhD",
        duration: "",
        requirement: "Academic Masters with research dissertation and minimum of 60% or CGPA of 4.50/5.0 (First Class)",
        listOfPrograms: "",
      },
    ],
  },
  {
    name: "College of Natural and Applied Sciences",
    programmes: [
      {
        program: "PGD",
        duration: "minimum of one academic session",
        requirement: "First degree (minimum 3rd class - CGPA 1.50/5.0) in relevant discipline",
        listOfPrograms: "",
      },
      {
        program: "Masters",
        duration: "minimum of 18 months",
        requirement:
          "First degree (minimum 2nd class lower - CGPA 2.40/5.0) in relevant discipline",
        listOfPrograms: ["M.Sc in BioChemistry", "M.Sc in MicroBiology"],
      },
      {
        program: "MPhil/PhD",
        duration: "minimum of three academic session",
        requirement:  "Academic Masters with research dissertation and minimum of 55-59% or CGPA of 3.5/5.0",
        listOfPrograms: [
          "MPhil/PhD in BioChemistry",
          "MPhil/PhD in MicroBiology",
        ],
      },
      {
        program: "PhD",
        duration: "minimum of four academic session",
        requirement: "Academic Masters with research dissertation and minimum of 60% or CGPA of 4.0/5.0",
        listOfPrograms: ["PhD in BioChemistry", "PhD in MicroBiology"],
      },
    ],
  },
  {
    name: "Abeokuta Business school",
    programmes: [
      {
        program: "PGD",
        duration: "minimum of one academic session",
        requirement: "First degree (minimum 3rd class) in relevant discipline",
        listOfPrograms: "",
      },
      {
        program: "Masters",
        duration: "minimum of 18 months",
        requirement:
          "First degree (minimum 2nd class lower) in relevant discipline",
        listOfPrograms: [
          "M.Sc in Accounting",
          "M.Sc in Islamic Studies",
          "M.Sc in Political Science",
          "M.Sc in Business Administration",
          "M.Sc in Mass Communication",
          "M.Sc in Economics",
        ],
      },
      {
        program: "MPhil/PhD",
        duration: "minimum of three academic session",
        requirement:  "Academic Masters with research dissertation and minimum of 55-59% or CGPA of 3.5/5.0",
        listOfPrograms: "",
      },
      {
        program: "PhD",
        duration: "minimum of four academic session",
        requirement: "Academic Masters with research dissertation and minimum of 60% or CGPA of 4.0/5.0",
        listOfPrograms: "",
      },
    ],
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const programmesContainer = document.getElementById("programmes-container");
  let openAccordion = null;

  CollegeProgramsInfo.forEach((programInfo, i) => {
    const accordion = document.createElement("div");
    accordion.className = "accordion";

    const h2 = document.createElement("h2");
    h2.innerHTML = `${programInfo.name} <p>+</p>`;
    accordion.appendChild(h2);

    const content = document.createElement("div");
    content.className = "content";
    content.style.display = "none";

    const ol = document.createElement("ol");

    if (programInfo.programmes[0].listOfPrograms) {
      const pgdLi = document.createElement("li");
      pgdLi.innerHTML = "PGd Programs:";
      const pgdUl = document.createElement("ul");
      programInfo.programmes[0].listOfPrograms.forEach((program) => {
        const li = document.createElement("li");
        li.textContent = program;
        pgdUl.appendChild(li);
      });
      pgdLi.appendChild(pgdUl);
      ol.appendChild(pgdLi);
    }

    if (programInfo.programmes[1].listOfPrograms) {
      const mastersLi = document.createElement("li");
      mastersLi.innerHTML = "Masters Programs:";
      const mastersUl = document.createElement("ul");
      programInfo.programmes[1].listOfPrograms.forEach((program) => {
        const li = document.createElement("li");
        li.textContent = program;
        mastersUl.appendChild(li);
      });
      mastersLi.appendChild(mastersUl);
      ol.appendChild(mastersLi);
    }

    if (programInfo.programmes[2].listOfPrograms) {
      const mphilLi = document.createElement("li");
      mphilLi.innerHTML = "MPhil/PhD Programs:";
      const mphilUl = document.createElement("ul");
      programInfo.programmes[2].listOfPrograms.forEach((program) => {
        const li = document.createElement("li");
        li.textContent = program;
        mphilUl.appendChild(li);
      });
      mphilLi.appendChild(mphilUl);
      ol.appendChild(mphilLi);
    }

    if (programInfo.programmes[3].listOfPrograms) {
      const phdLi = document.createElement("li");
      phdLi.innerHTML = "PhD Programs:";
      const phdUl = document.createElement("ul");
      programInfo.programmes[3].listOfPrograms.forEach((program) => {
        const li = document.createElement("li");
        li.textContent = program;
        phdUl.appendChild(li);
      });
      phdLi.appendChild(phdUl);
      ol.appendChild(phdLi);
    }

    const durationLi = document.createElement("li");
    durationLi.innerHTML = `Duration: ${programInfo.programmes[0].program} : ${programInfo.programmes[0].duration} | ${programInfo.programmes[1].program} : ${programInfo.programmes[1].duration} | ${programInfo.programmes[2].program} : ${programInfo.programmes[2].duration} | ${programInfo.programmes[3].program} : ${programInfo.programmes[3].duration}`;
    ol.appendChild(durationLi);

    const requirementLi = document.createElement("li");
    requirementLi.innerHTML = "Admission Requirements";
    const requirementUl = document.createElement("ul");
    requirementUl.innerHTML = `
      <li>${programInfo.programmes[0].program}: ${programInfo.programmes[0].requirement}</li>
      <li>${programInfo.programmes[1].program}: ${programInfo.programmes[1].requirement}</li>
      <li>${programInfo.programmes[2].program}: ${programInfo.programmes[2].requirement}</li>
      <li>${programInfo.programmes[3].program}: ${programInfo.programmes[3].requirement}</li>
    `;
    requirementLi.appendChild(requirementUl);
    ol.appendChild(requirementLi);

    content.appendChild(ol);
    accordion.appendChild(content);

    h2.addEventListener("click", () => {
      if (openAccordion === accordion) {
        content.style.display = "none";
        h2.querySelector("p").textContent = "+";
        openAccordion = null;
      } else {
        if (openAccordion) {
          openAccordion.querySelector(".content").style.display = "none";
          openAccordion.querySelector("h2 p").textContent = "+";
        }
        content.style.display = "block";
        h2.querySelector("p").textContent = "-";
        openAccordion = accordion;
      }
    });

    programmesContainer.appendChild(accordion);
  });
});
