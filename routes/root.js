const express = require("express");
const router = express.Router();
const path = require("path")
// const data = require("../data");
// const searchData = data.search;


router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "root.html"));
  });

// router.get("/:id", async (req, res) => {
//     console.log('The details route has been envoked', req.params);
//     let targetPerson;
//     let targetId = req.params.id;
//     console.log('this is the target id:', targetId)
//     if (typeof targetId === 'undefined' || isNaN(Number(targetId))) {
//         res.redirect("/");
//         return;
//     }
//     console.log('id:', targetId);
//     let allPeople = await searchData.getPeople();

//     for (i=0; i<allPeople.length; i++) {
//         if (targetId === allPeople[i].id.toString()) {
//             targetPerson = allPeople[i];
//         }
//     }
//     res.render("search/details", {person: targetPerson})
// });


// router.post("/", async (req, res) => {    
//   let personNameData = req.body;
//   let error;

//   if (!personNameData.personName) {
//     error = "No name provided.";
//   }

//   if (error) {
//     res.render("search/index", {
//       error: error,
//       hasErrors: true,
//       post: personNameData
//     });
//     return;
//   }

//     const peopleList = await searchData.getPersonByName(personNameData.personName);
//   try {
//     res.render("search/result", { peopleList: peopleList, personName: personNameData.personName, noResults: peopleList.length < 1 });
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// });

module.exports = router;
