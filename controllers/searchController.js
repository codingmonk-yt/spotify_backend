const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.search = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { q, type, market, limit, offset } = req.query;
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q,
        type,
        market,
        limit,
        offset,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});
