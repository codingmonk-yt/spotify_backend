const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getChapter = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { market } = req.query;
  const { chapter_id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/chapters/${chapter_id}`,
      {
        params: {
          market,
        },
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

exports.getChapters = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { market, ids } = req.query;

  try {
    const response = await axios.get("https://api.spotify.com/v1/chapters", {
      params: {
        ids: ids,
        market,
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
