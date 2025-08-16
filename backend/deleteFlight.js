// deleteFlight.js
async function deleteFlight(req, res, next) {
  const { id } = req.params;
  console.log("Deleting flight with id:", id);

  try {
    const result = await req.db.run(`DELETE FROM flights WHERE id = ?`, [id]);

    if (result.changes === 0) {
      const err = new Error("Flight not found");
      err.status = 404;
      throw err;
    }

    res.json({ message: "Flight deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = deleteFlight;
