const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getBrowseCategories = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { country, limit, offset } = req.query;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/categories",
      {
        params: {
          country,
          limit,
          offset,
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

exports.getBrowseCategory = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { category } = req.params;
  const { country } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${category}`,
      {
        params: {
          country,
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
