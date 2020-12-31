const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const TestData = require("../models/TestData");
const Text = require("../models/Text");

const auth = require("../middleware/auth.middleware");
const { async } = require("rxjs/internal/scheduler/async");

const router = Router();

router.post("/cteate", auth, async (req, res) => {
  try {
    const { testDataName } = req.body;

    const candidate = await TestData.findOne({ name: testDataName });
    if (candidate) {
      res.status(400).json({ message: "Bereits exestirt" });
    }
    const name = new TestData({
      name: testDataName,
      publicStatus: false,
    });

    await name.save();
    const nameFind = await TestData.findOne({ name: testDataName });

    for (i = 0; i < 4; i++) {
      const text = new Text({
        owner: nameFind._id,
        correctAnswer: "",
        question: "",
      });

      await text.save();
    }

    res.status(201).json({ message: "Gespeichert" });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.get("/loading", auth, async (req, res) => {
  try {
    const testDataListe = await TestData.find();

    res.status(201).json({ testDataListe });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.get(`/one/loading/:oneTestDataId`, auth, async (req, res) => {
  // console.log("one loading");
  try {
    const testData = await TestData.findOne({
      _id: req.params.oneTestDataId,
    });

    const textsArray = await Text.find({ owner: req.params.oneTestDataId });
    // console.log(textsArray, "looooooading");
    const texts = textsArray
      // .filter(({ __v }) => __v === 0)
      .map(({ question, correctAnswer, _id }) => {
        return { question, correctAnswer, _id };
      });

    const oneTestData = {
      name: testData.name,
      _id: testData._id,
      publicStatus: testData.publicStatus,
      texts,
    };

    res.status(201).json({ oneTestData });
  } catch (e) {
    res.status(500).json({ message: "error 404" });
  }
});

router.put(`/one/update/:oneTestDataId`, auth, async (req, res) => {
  try {
    const { oneTestData } = req.body;

    oneTestData.texts.forEach(async (item) => {
      if (item._id !== "") {
        Text.findByIdAndUpdate(item._id, item, function (err, docs) {
          if (err) {
            console.log(err);
          } else {
          }
        });
      } else {
        const text = new Text({
          owner: req.params.oneTestDataId,
          correctAnswer: item.correctAnswer,
          question: item.question,
        });

        await text.save();
      }
    });
    res
      .status(201)
      .json({ message: "Gespeichert", oneTestDataId: oneTestData._id });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.delete(`/one-question-delete/:id`, auth, async (req, res) => {
  try {
    // console.log(req.params.id);
    Text.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);

      res.status(201).json({ message: "Gelöscht" });
    });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.delete(`/one-test-data-delete/:id`, auth, async (req, res) => {
  try {
    TestData.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);

      res.status(201).json({ message: "TestData ist Gelöscht" });
    });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

router.put(`/one/public-status/:oneTestDataId`, auth, async (req, res) => {
  try {
    const { status, oneTestDataId } = req.body;
    const textsArray = await TestData.findOne({ _id: oneTestDataId });

    const statuschanges = {
      name: textsArray.name,
      publicStatus: status,
    };

    TestData.findByIdAndUpdate(
      oneTestDataId,
      statuschanges,
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
    res.status(201).json({ message: "Gespeichert", oneTestDataId });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

module.exports = router;
