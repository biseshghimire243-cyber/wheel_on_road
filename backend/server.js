const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const db = require("./db");


/* =========================
   LOAD ENVIRONMENT
========================= */

dotenv.config();


/* =========================
   CREATE EXPRESS APP
========================= */

const app = express();


/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


/* =========================
   SERVE FRONTEND
========================= */

app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);


/* =========================
   HOME PAGE
========================= */

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );

});


/* =========================
   TEST API
========================= */

app.get("/api/test", (req, res) => {

    res.json({
        success: true,
        message: "BMW Journey API is working!"
    });

});


/* ==================================================
   SAVE JOURNEY
================================================== */

app.post("/api/journeys", (req, res) => {

    const {
        distance,
        latitude,
        longitude
    } = req.body;


    if (
        distance === undefined ||
        latitude === undefined ||
        longitude === undefined
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Distance, latitude and longitude are required."

        });

    }


    const sql = `
        INSERT INTO journeys
        (
            distance,
            latitude,
            longitude
        )
        VALUES (?, ?, ?)
    `;


    db.query(
        sql,
        [
            distance,
            latitude,
            longitude
        ],
        (error, result) => {

            if (error) {

                console.log(error);

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to save journey."

                });

            }


            res.status(201).json({

                success: true,

                message:
                    "Journey saved successfully.",

                journeyId:
                    result.insertId

            });

        }
    );

});


/* ==================================================
   GET ALL JOURNEYS
================================================== */

app.get("/api/journeys", (req, res) => {

    const sql = `
        SELECT
            id,
            distance,
            latitude,
            longitude,
            created_at
        FROM journeys
        ORDER BY id DESC
    `;


    db.query(
        sql,
        (error, results) => {

            if (error) {

                console.log(error);

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to get journeys."

                });

            }


            res.json({

                success: true,

                count: results.length,

                journeys: results

            });

        }
    );

});


/* ==================================================
   GET SINGLE JOURNEY
================================================== */

app.get(
    "/api/journeys/:id",
    (req, res) => {

        const id = req.params.id;


        const sql = `
            SELECT
                id,
                distance,
                latitude,
                longitude,
                created_at
            FROM journeys
            WHERE id = ?
        `;


        db.query(
            sql,
            [id],
            (error, results) => {

                if (error) {

                    return res.status(500).json({

                        success: false,

                        message:
                            "Database error."

                    });

                }


                if (results.length === 0) {

                    return res.status(404).json({

                        success: false,

                        message:
                            "Journey not found."

                    });

                }


                res.json({

                    success: true,

                    journey: results[0]

                });

            }
        );

    }
);


/* ==================================================
   UPDATE JOURNEY
================================================== */

app.put(
    "/api/journeys/:id",
    (req, res) => {

        const id = req.params.id;

        const {
            distance,
            latitude,
            longitude
        } = req.body;


        const sql = `
            UPDATE journeys
            SET
                distance = ?,
                latitude = ?,
                longitude = ?
            WHERE id = ?
        `;


        db.query(
            sql,
            [
                distance,
                latitude,
                longitude,
                id
            ],
            (error, result) => {

                if (error) {

                    return res.status(500).json({

                        success: false,

                        message:
                            "Failed to update journey."

                    });

                }


                if (result.affectedRows === 0) {

                    return res.status(404).json({

                        success: false,

                        message:
                            "Journey not found."

                    });

                }


                res.json({

                    success: true,

                    message:
                        "Journey updated successfully."

                });

            }
        );

    }
);


/* ==================================================
   DELETE JOURNEY
================================================== */

app.delete(
    "/api/journeys/:id",
    (req, res) => {

        const id = req.params.id;


        const sql = `
            DELETE FROM journeys
            WHERE id = ?
        `;


        db.query(
            sql,
            [id],
            (error, result) => {

                if (error) {

                    return res.status(500).json({

                        success: false,

                        message:
                            "Failed to delete journey."

                    });

                }


                if (result.affectedRows === 0) {

                    return res.status(404).json({

                        success: false,

                        message:
                            "Journey not found."

                    });

                }


                res.json({

                    success: true,

                    message:
                        "Journey deleted successfully."

                });

            }
        );

    }
);


/* =========================
   404 API
========================= */

app.use(
    "/api",
    (req, res) => {

        res.status(404).json({

            success: false,

            message: "API endpoint not found."

        });

    }
);


/* =========================
   ERROR HANDLER
========================= */

app.use(
    (error, req, res, next) => {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Internal server error."

        });

    }
);


/* =========================
   START SERVER
========================= */

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(
            `🚗 BMW Journey Server running at http://localhost:${PORT}`
        );

    }
);