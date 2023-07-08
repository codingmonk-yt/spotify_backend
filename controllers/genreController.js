const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getAvailableGenreSeeds = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});
