
module.exports = (app) => {


  app.get("/", async (req, res, next) => {
    try {
      return res.json({ data: "hello from analytics" });
    } catch (err) {
      next(err);
    }
  });
};
