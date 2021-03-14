const { Router } = require("express");

const TestData = require("../models/TestData");
const Text = require("../models/Text");

const auth = require("../middleware/auth.middleware");

const Test = require("../models/Test");
const User = require("../models/User");

const router = Router();

router.post("/test-create/:oneTestDataId", auth, async (req, res) => {
  try {
    // console.log(req.user.userId, "req.user.userId");
    const oldTest = await Test.findOne({
      player: req.user.userId,
      start: false,
      testDataOwner: req.params.oneTestDataId,
    });

    if (oldTest !== null) {
      const test = oldTest;

      res.status(201).json({ message: "Test", test });
    } else {
      const testData = await TestData.findById(req.params.oneTestDataId);

      const textsArray = await Text.find({ owner: req.params.oneTestDataId });

      const texts = textsArray.map(({ question, correctAnswer, _id }) => {
        return { question, correctAnswer, _id };
      });

      const oneTestData = {
        name: testData.name,
        _id: testData._id,
        publicStatus: testData.publicStatus,
        texts,
      };

      const testTexts = oneTestData.texts.map(
        ({ question, correctAnswer }, index) => {
          var allAnswer = [
            { answer: "" },
            { answer: "" },
            { answer: "" },
            { answer: "" },
          ];

          var allAnswerListe = oneTestData.texts.map(({ correctAnswer }) => {
            return correctAnswer;
          });

          var noCorrectAnswerListe = allAnswerListe.filter((item) => {
            return item !== correctAnswer;
          });

          var threeNoCorrectAnswer = [];

          for (i = 0; i < 3; i++) {
            const noCorrectAnswerSelect = Math.floor(
              Math.random() * (noCorrectAnswerListe.length - 1)
            );
            threeNoCorrectAnswer.push(
              noCorrectAnswerListe[noCorrectAnswerSelect]
            );

            const newNoCorrectAnswerListe = noCorrectAnswerListe.filter(
              (item, index) => {
                return item !== noCorrectAnswerListe[noCorrectAnswerSelect];
              }
            );
            noCorrectAnswerListe = newNoCorrectAnswerListe;
          }

          var allAnswerArray = [correctAnswer, ...threeNoCorrectAnswer];

          for (i = 0; i < 4; i++) {
            const indexOfAnswer = Math.floor(
              Math.random() * (allAnswerArray.length - 1)
            );

            allAnswer[i].answer = allAnswerArray[indexOfAnswer];
            const newAllAnswerArray = allAnswerArray.filter((item, index) => {
              return item !== allAnswerArray[indexOfAnswer];
            });
            allAnswerArray = newAllAnswerArray;
          }

          const playerAnswer = "";

          return { question, correctAnswer, allAnswer, playerAnswer };
        }
      );

      const test = new Test({
        name: oneTestData.name,
        testTexts: testTexts,
        player: req.user.userId,
        testDataOwner: oneTestData._id,
        end: false,
        start: false,
      });

      await test.save();

      res.status(201).json({ message: "Test", test });
    }
  } catch (e) {
    res.status(500).json({ message: "error 404" });
  }
});

router.get(`/:testId`, auth, async (req, res) => {
  try {
    const oneTest = await Test.findById(req.params.testId);

    if (JSON.stringify(req.user.userId) !== JSON.stringify(oneTest.player)) {
      res.status(500).json({ message: "Wrong User" });
    }
    res.status(201).json({ oneTest });
  } catch (e) {
    res.status(500).json({ message: "error 404" });
  }
});

router.put(`/update/:testId`, auth, async (req, res) => {
  try {
    // console.log(req.params.testId);
    const { newAllTexts } = req.body;

    const oneTest = await Test.findById(req.params.testId);

    const endStatus = await newAllTexts.find((item) => {
      return item.playerAnswer === "";
    });

    var newTest = {};
    if (endStatus !== undefined) {
      var newTest = {
        name: oneTest.name,
        testTexts: newAllTexts,
        player: oneTest.player,
        testDataOwner: oneTest.testDataOwner,
        end: oneTest.end,
        start: oneTest.start,
      };
    } else {
      var newTest = {
        name: oneTest.name,
        testTexts: newAllTexts,
        player: oneTest.player,
        testDataOwner: oneTest.testDataOwner,
        end: true,
        start: oneTest.start,
      };
    }

    Test.findByIdAndUpdate(req.params.testId, newTest, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
      }
    });
    res.status(201).json();
  } catch (e) {
    res.status(500).json({ message: "error 404" });
  }
});

router.put(`/startStatus/update/:testId`, auth, async (req, res) => {
  try {
    // console.log(req.params.testId);
    const { startStatus } = req.body;

    const oneTest = await Test.findById(req.params.testId);

    const newTest = {
      name: oneTest.name,
      testTexts: oneTest.testTexts,
      player: oneTest.player,
      testDataOwner: oneTest.testDataOwner,
      end: oneTest.end,
      start: startStatus,
    };

    Test.findByIdAndUpdate(req.params.testId, newTest, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
      }
    });
    res.status(201).json();
  } catch (e) {
    res.status(500).json({ message: "error 404" });
  }
});

module.exports = router;
